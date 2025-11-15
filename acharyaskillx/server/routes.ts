import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  generateInterviewQuestions, 
  evaluateInterviewAnswer, 
  generateOverallInterviewEvaluation,
  generatePersonalizedFeedback
} from "./services/openai";
import { 
  insertCourseSchema, 
  insertInternshipSchema, 
  insertCompetitionSchema,
  insertAiInterviewSessionSchema 
} from "server/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  setupAuth(app);

  // User profile routes
  app.get('/api/profile', async (req: any, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user;
      let profile = null;

      if (user.role === 'student') {
        profile = await storage.getStudentProfile(user.id);
      } else if (user.role === 'faculty') {
        profile = await storage.getFacultyProfile(user.id);
      } else if (user.role === 'recruiter') {
        profile = await storage.getRecruiterProfile(user.id);
      }

      res.json({ user, profile });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Failed to fetch profile" });
    }
  });

  app.put('/api/profile', async (req: any, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const user = req.user;
      const { userUpdates, profileUpdates } = req.body;

      // Update user if needed
      if (userUpdates) {
        await storage.updateUser(user.id, userUpdates);
      }

      // Update profile based on role
      let updatedProfile = null;
      if (profileUpdates) {
        if (user.role === 'student') {
          updatedProfile = await storage.updateStudentProfile(user.id, profileUpdates);
        } else if (user.role === 'faculty') {
          updatedProfile = await storage.updateFacultyProfile(user.id, profileUpdates);
        } else if (user.role === 'recruiter') {
          updatedProfile = await storage.updateRecruiterProfile(user.id, profileUpdates);
        }
      }

      res.json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Course routes
  app.get('/api/courses', async (req, res) => {
    try {
      const courses = await storage.getCourses();
      res.json(courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await storage.getCourse(req.params.id);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.json(course);
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ message: "Failed to fetch course" });
    }
  });

  app.post('/api/courses', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'faculty') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const courseData = insertCourseSchema.parse({
        ...req.body,
        createdBy: req.user.id
      });
      const course = await storage.createCourse(courseData);
      res.status(201).json(course);
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Failed to create course" });
    }
  });

  app.post('/api/courses/:id/enroll', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const enrollment = await storage.enrollInCourse(req.params.id, req.user.id);
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Error enrolling in course:", error);
      res.status(500).json({ message: "Failed to enroll in course" });
    }
  });

  app.get('/api/my-enrollments', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const enrollments = await storage.getCourseEnrollments(req.user.id);
      res.json(enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      res.status(500).json({ message: "Failed to fetch enrollments" });
    }
  });

  // Internship routes
  app.get('/api/internships', async (req, res) => {
    try {
      const internships = await storage.getInternships();
      res.json(internships);
    } catch (error) {
      console.error("Error fetching internships:", error);
      res.status(500).json({ message: "Failed to fetch internships" });
    }
  });

  app.get('/api/internships/:id', async (req, res) => {
    try {
      const internship = await storage.getInternship(req.params.id);
      if (!internship) {
        return res.status(404).json({ message: "Internship not found" });
      }
      res.json(internship);
    } catch (error) {
      console.error("Error fetching internship:", error);
      res.status(500).json({ message: "Failed to fetch internship" });
    }
  });

  app.post('/api/internships', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'recruiter') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const internshipData = insertInternshipSchema.parse({
        ...req.body,
        postedBy: req.user.id
      });
      const internship = await storage.createInternship(internshipData);
      res.status(201).json(internship);
    } catch (error) {
      console.error("Error creating internship:", error);
      res.status(500).json({ message: "Failed to create internship" });
    }
  });

  app.post('/api/internships/:id/apply', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const { coverLetter } = req.body;
      const application = await storage.applyToInternship(req.params.id, req.user.id, coverLetter);
      res.status(201).json(application);
    } catch (error) {
      console.error("Error applying to internship:", error);
      res.status(500).json({ message: "Failed to apply to internship" });
    }
  });

  app.get('/api/my-applications', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const applications = await storage.getInternshipApplications(req.user.id);
      res.json(applications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ message: "Failed to fetch applications" });
    }
  });

  // Competition routes
  app.get('/api/competitions', async (req, res) => {
    try {
      const competitions = await storage.getCompetitions();
      res.json(competitions);
    } catch (error) {
      console.error("Error fetching competitions:", error);
      res.status(500).json({ message: "Failed to fetch competitions" });
    }
  });

  app.post('/api/competitions', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'faculty') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const competitionData = insertCompetitionSchema.parse({
        ...req.body,
        organizedBy: req.user.id
      });
      const competition = await storage.createCompetition(competitionData);
      res.status(201).json(competition);
    } catch (error) {
      console.error("Error creating competition:", error);
      res.status(500).json({ message: "Failed to create competition" });
    }
  });

  app.post('/api/competitions/:id/register', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const { teamName, teamMembers } = req.body;
      const registration = await storage.registerForCompetition(req.params.id, req.user.id, teamName, teamMembers);
      res.status(201).json(registration);
    } catch (error) {
      console.error("Error registering for competition:", error);
      res.status(500).json({ message: "Failed to register for competition" });
    }
  });

  // AI Interview routes
  app.post('/api/ai-interview/start', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const { jobRole, difficulty = 'medium' } = req.body;
      
      // Generate interview questions
      const questions = await generateInterviewQuestions(jobRole, difficulty, 5);
      
      // Create interview session
      const sessionData = insertAiInterviewSessionSchema.parse({
        studentId: req.user.id,
        jobRole,
        difficulty,
        questions: questions.map(q => ({ question: q.question, answer: '', timeSpent: 0 })),
        status: 'in_progress'
      });

      const session = await storage.createAiInterviewSession(sessionData);
      res.status(201).json(session);
    } catch (error) {
      console.error("Error starting AI interview:", error);
      res.status(500).json({ message: "Failed to start AI interview" });
    }
  });

  app.put('/api/ai-interview/:id/answer', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const { questionIndex, answer, timeSpent } = req.body;
      const session = await storage.getAiInterviewSession(req.params.id);
      
      if (!session || session.studentId !== req.user.id) {
        return res.status(404).json({ message: "Interview session not found" });
      }

      // Update the answer for the specific question
      const updatedQuestions = [...session.questions];
      if (updatedQuestions[questionIndex]) {
        updatedQuestions[questionIndex] = {
          ...updatedQuestions[questionIndex],
          answer,
          timeSpent
        };
      }

      const updatedSession = await storage.updateAiInterviewSession(req.params.id, {
        questions: updatedQuestions
      });

      res.json(updatedSession);
    } catch (error) {
      console.error("Error updating interview answer:", error);
      res.status(500).json({ message: "Failed to update interview answer" });
    }
  });

  app.post('/api/ai-interview/:id/complete', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const session = await storage.getAiInterviewSession(req.params.id);
      
      if (!session || session.studentId !== req.user.id) {
        return res.status(404).json({ message: "Interview session not found" });
      }

      // Evaluate each answer
      const evaluatedQuestions = [];
      for (const qa of session.questions) {
        if (qa.answer) {
          const evaluation = await evaluateInterviewAnswer(
            qa.question,
            qa.answer,
            session.jobRole,
            [] // We'll need to store expected points from question generation
          );
          evaluatedQuestions.push({
            question: qa.question,
            answer: qa.answer,
            score: evaluation.score,
            category: 'technical' // We'll need to determine this from question generation
          });
        }
      }

      // Generate overall evaluation
      const overallEvaluation = await generateOverallInterviewEvaluation(
        session.jobRole,
        evaluatedQuestions
      );

      // Generate personalized feedback
      const feedback = await generatePersonalizedFeedback(
        req.user.firstName || req.user.username,
        session.jobRole,
        overallEvaluation,
        evaluatedQuestions
      );

      // Update session with results
      const completedSession = await storage.updateAiInterviewSession(req.params.id, {
        status: 'completed',
        overallScore: overallEvaluation.overallScore,
        communicationScore: overallEvaluation.communicationScore,
        technicalScore: overallEvaluation.technicalScore,
        confidenceScore: overallEvaluation.confidenceScore,
        feedback,
        duration: Math.floor((new Date().getTime() - new Date(session.createdAt!).getTime()) / (1000 * 60))
      });

      res.json(completedSession);
    } catch (error) {
      console.error("Error completing AI interview:", error);
      res.status(500).json({ message: "Failed to complete AI interview" });
    }
  });

  app.get('/api/my-interviews', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'student') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const sessions = await storage.getAiInterviewSessions(req.user.id);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching interview sessions:", error);
      res.status(500).json({ message: "Failed to fetch interview sessions" });
    }
  });

  // Analytics routes
  app.get('/api/analytics/overview', async (req: any, res) => {
    if (!req.isAuthenticated() || req.user.role !== 'faculty') {
      return res.status(403).json({ message: "Forbidden" });
    }

    try {
      const [studentStats, courseStats, internshipStats] = await Promise.all([
        storage.getStudentStats(),
        storage.getCourseStats(),
        storage.getInternshipStats()
      ]);

      res.json({
        students: studentStats,
        courses: courseStats,
        internships: internshipStats
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
