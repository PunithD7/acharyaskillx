import {
  users,
  studentProfiles,
  facultyProfiles,
  recruiterProfiles,
  courses,
  internships,
  competitions,
  courseEnrollments,
  internshipApplications,
  competitionRegistrations,
  aiInterviewSessions,
  type User,
  type InsertUser,
  type StudentProfile,
  type InsertStudentProfile,
  type FacultyProfile,
  type InsertFacultyProfile,
  type RecruiterProfile,
  type InsertRecruiterProfile,
  type Course,
  type InsertCourse,
  type Internship,
  type InsertInternship,
  type Competition,
  type InsertCompetition,
  type CourseEnrollment,
  type InternshipApplication,
  type CompetitionRegistration,
  type AiInterviewSession,
  type InsertAiInterviewSession,
} from "server/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User>;

  // Profile operations
  getStudentProfile(userId: string): Promise<StudentProfile | undefined>;
  createStudentProfile(profile: InsertStudentProfile): Promise<StudentProfile>;
  updateStudentProfile(userId: string, updates: Partial<StudentProfile>): Promise<StudentProfile>;

  getFacultyProfile(userId: string): Promise<FacultyProfile | undefined>;
  createFacultyProfile(profile: InsertFacultyProfile): Promise<FacultyProfile>;
  updateFacultyProfile(userId: string, updates: Partial<FacultyProfile>): Promise<FacultyProfile>;

  getRecruiterProfile(userId: string): Promise<RecruiterProfile | undefined>;
  createRecruiterProfile(profile: InsertRecruiterProfile): Promise<RecruiterProfile>;
  updateRecruiterProfile(userId: string, updates: Partial<RecruiterProfile>): Promise<RecruiterProfile>;

  // Course operations
  getCourses(): Promise<Course[]>;
  getCourse(id: string): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  updateCourse(id: string, updates: Partial<Course>): Promise<Course>;
  deleteCourse(id: string): Promise<void>;

  // Course enrollment operations
  enrollInCourse(courseId: string, studentId: string): Promise<CourseEnrollment>;
  getCourseEnrollments(studentId: string): Promise<CourseEnrollment[]>;
  updateCourseProgress(courseId: string, studentId: string, progress: number): Promise<CourseEnrollment>;

  // Internship operations
  getInternships(): Promise<Internship[]>;
  getInternship(id: string): Promise<Internship | undefined>;
  createInternship(internship: InsertInternship): Promise<Internship>;
  updateInternship(id: string, updates: Partial<Internship>): Promise<Internship>;
  deleteInternship(id: string): Promise<void>;

  // Internship application operations
  applyToInternship(internshipId: string, studentId: string, coverLetter?: string): Promise<InternshipApplication>;
  getInternshipApplications(studentId: string): Promise<InternshipApplication[]>;
  getApplicationsForInternship(internshipId: string): Promise<InternshipApplication[]>;
  updateApplicationStatus(id: string, status: string): Promise<InternshipApplication>;

  // Competition operations
  getCompetitions(): Promise<Competition[]>;
  getCompetition(id: string): Promise<Competition | undefined>;
  createCompetition(competition: InsertCompetition): Promise<Competition>;
  updateCompetition(id: string, updates: Partial<Competition>): Promise<Competition>;
  deleteCompetition(id: string): Promise<void>;

  // Competition registration operations
  registerForCompetition(competitionId: string, studentId: string, teamName?: string, teamMembers?: string[]): Promise<CompetitionRegistration>;
  getCompetitionRegistrations(studentId: string): Promise<CompetitionRegistration[]>;

  // AI Interview operations
  createAiInterviewSession(session: InsertAiInterviewSession): Promise<AiInterviewSession>;
  getAiInterviewSession(id: string): Promise<AiInterviewSession | undefined>;
  updateAiInterviewSession(id: string, updates: Partial<AiInterviewSession>): Promise<AiInterviewSession>;
  getAiInterviewSessions(studentId: string): Promise<AiInterviewSession[]>;

  // Analytics
  getStudentStats(): Promise<{ totalStudents: number; activeStudents: number }>;
  getCourseStats(): Promise<{ totalCourses: number; totalEnrollments: number }>;
  getInternshipStats(): Promise<{ totalInternships: number; totalApplications: number }>;

  sessionStore: session.SessionStore;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.SessionStore;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Profile operations
  async getStudentProfile(userId: string): Promise<StudentProfile | undefined> {
    const [profile] = await db.select().from(studentProfiles).where(eq(studentProfiles.userId, userId));
    return profile || undefined;
  }

  async createStudentProfile(profile: InsertStudentProfile): Promise<StudentProfile> {
    const [newProfile] = await db.insert(studentProfiles).values(profile).returning();
    return newProfile;
  }

  async updateStudentProfile(userId: string, updates: Partial<StudentProfile>): Promise<StudentProfile> {
    const [profile] = await db
      .update(studentProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(studentProfiles.userId, userId))
      .returning();
    return profile;
  }

  async getFacultyProfile(userId: string): Promise<FacultyProfile | undefined> {
    const [profile] = await db.select().from(facultyProfiles).where(eq(facultyProfiles.userId, userId));
    return profile || undefined;
  }

  async createFacultyProfile(profile: InsertFacultyProfile): Promise<FacultyProfile> {
    const [newProfile] = await db.insert(facultyProfiles).values(profile).returning();
    return newProfile;
  }

  async updateFacultyProfile(userId: string, updates: Partial<FacultyProfile>): Promise<FacultyProfile> {
    const [profile] = await db
      .update(facultyProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(facultyProfiles.userId, userId))
      .returning();
    return profile;
  }

  async getRecruiterProfile(userId: string): Promise<RecruiterProfile | undefined> {
    const [profile] = await db.select().from(recruiterProfiles).where(eq(recruiterProfiles.userId, userId));
    return profile || undefined;
  }

  async createRecruiterProfile(profile: InsertRecruiterProfile): Promise<RecruiterProfile> {
    const [newProfile] = await db.insert(recruiterProfiles).values(profile).returning();
    return newProfile;
  }

  async updateRecruiterProfile(userId: string, updates: Partial<RecruiterProfile>): Promise<RecruiterProfile> {
    const [profile] = await db
      .update(recruiterProfiles)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(recruiterProfiles.userId, userId))
      .returning();
    return profile;
  }

  // Course operations
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).where(eq(courses.isActive, true)).orderBy(desc(courses.createdAt));
  }

  async getCourse(id: string): Promise<Course | undefined> {
    const [course] = await db.select().from(courses).where(eq(courses.id, id));
    return course || undefined;
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const [newCourse] = await db.insert(courses).values(course).returning();
    return newCourse;
  }

  async updateCourse(id: string, updates: Partial<Course>): Promise<Course> {
    const [course] = await db
      .update(courses)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(courses.id, id))
      .returning();
    return course;
  }

  async deleteCourse(id: string): Promise<void> {
    await db.update(courses).set({ isActive: false }).where(eq(courses.id, id));
  }

  // Course enrollment operations
  async enrollInCourse(courseId: string, studentId: string): Promise<CourseEnrollment> {
    const [enrollment] = await db.insert(courseEnrollments).values({
      courseId,
      studentId,
    }).returning();
    return enrollment;
  }

  async getCourseEnrollments(studentId: string): Promise<CourseEnrollment[]> {
    return await db.select().from(courseEnrollments).where(eq(courseEnrollments.studentId, studentId));
  }

  async updateCourseProgress(courseId: string, studentId: string, progress: number): Promise<CourseEnrollment> {
    const [enrollment] = await db
      .update(courseEnrollments)
      .set({ 
        progress, 
        completedAt: progress === 100 ? new Date() : null 
      })
      .where(and(
        eq(courseEnrollments.courseId, courseId),
        eq(courseEnrollments.studentId, studentId)
      ))
      .returning();
    return enrollment;
  }

  // Internship operations
  async getInternships(): Promise<Internship[]> {
    return await db.select().from(internships).where(eq(internships.isActive, true)).orderBy(desc(internships.createdAt));
  }

  async getInternship(id: string): Promise<Internship | undefined> {
    const [internship] = await db.select().from(internships).where(eq(internships.id, id));
    return internship || undefined;
  }

  async createInternship(internship: InsertInternship): Promise<Internship> {
    const [newInternship] = await db.insert(internships).values(internship).returning();
    return newInternship;
  }

  async updateInternship(id: string, updates: Partial<Internship>): Promise<Internship> {
    const [internship] = await db
      .update(internships)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(internships.id, id))
      .returning();
    return internship;
  }

  async deleteInternship(id: string): Promise<void> {
    await db.update(internships).set({ isActive: false }).where(eq(internships.id, id));
  }

  // Internship application operations
  async applyToInternship(internshipId: string, studentId: string, coverLetter?: string): Promise<InternshipApplication> {
    const [application] = await db.insert(internshipApplications).values({
      internshipId,
      studentId,
      coverLetter,
    }).returning();
    return application;
  }

  async getInternshipApplications(studentId: string): Promise<InternshipApplication[]> {
    return await db.select().from(internshipApplications).where(eq(internshipApplications.studentId, studentId));
  }

  async getApplicationsForInternship(internshipId: string): Promise<InternshipApplication[]> {
    return await db.select().from(internshipApplications).where(eq(internshipApplications.internshipId, internshipId));
  }

  async updateApplicationStatus(id: string, status: string): Promise<InternshipApplication> {
    const [application] = await db
      .update(internshipApplications)
      .set({ status, updatedAt: new Date() })
      .where(eq(internshipApplications.id, id))
      .returning();
    return application;
  }

  // Competition operations
  async getCompetitions(): Promise<Competition[]> {
    return await db.select().from(competitions).where(eq(competitions.isActive, true)).orderBy(desc(competitions.createdAt));
  }

  async getCompetition(id: string): Promise<Competition | undefined> {
    const [competition] = await db.select().from(competitions).where(eq(competitions.id, id));
    return competition || undefined;
  }

  async createCompetition(competition: InsertCompetition): Promise<Competition> {
    const [newCompetition] = await db.insert(competitions).values(competition).returning();
    return newCompetition;
  }

  async updateCompetition(id: string, updates: Partial<Competition>): Promise<Competition> {
    const [competition] = await db
      .update(competitions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(competitions.id, id))
      .returning();
    return competition;
  }

  async deleteCompetition(id: string): Promise<void> {
    await db.update(competitions).set({ isActive: false }).where(eq(competitions.id, id));
  }

  // Competition registration operations
  async registerForCompetition(competitionId: string, studentId: string, teamName?: string, teamMembers?: string[]): Promise<CompetitionRegistration> {
    const [registration] = await db.insert(competitionRegistrations).values({
      competitionId,
      studentId,
      teamName,
      teamMembers,
    }).returning();
    return registration;
  }

  async getCompetitionRegistrations(studentId: string): Promise<CompetitionRegistration[]> {
    return await db.select().from(competitionRegistrations).where(eq(competitionRegistrations.studentId, studentId));
  }

  // AI Interview operations
  async createAiInterviewSession(session: InsertAiInterviewSession): Promise<AiInterviewSession> {
    const [newSession] = await db.insert(aiInterviewSessions).values(session).returning();
    return newSession;
  }

  async getAiInterviewSession(id: string): Promise<AiInterviewSession | undefined> {
    const [session] = await db.select().from(aiInterviewSessions).where(eq(aiInterviewSessions.id, id));
    return session || undefined;
  }

  async updateAiInterviewSession(id: string, updates: Partial<AiInterviewSession>): Promise<AiInterviewSession> {
    const [session] = await db
      .update(aiInterviewSessions)
      .set({ 
        ...updates, 
        completedAt: updates.status === 'completed' ? new Date() : undefined 
      })
      .where(eq(aiInterviewSessions.id, id))
      .returning();
    return session;
  }

  async getAiInterviewSessions(studentId: string): Promise<AiInterviewSession[]> {
    return await db.select().from(aiInterviewSessions)
      .where(eq(aiInterviewSessions.studentId, studentId))
      .orderBy(desc(aiInterviewSessions.createdAt));
  }

  // Analytics
  async getStudentStats(): Promise<{ totalStudents: number; activeStudents: number }> {
    const [totalResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(eq(users.role, 'student'));

    // Active students are those who have logged in within the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [activeResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(and(
        eq(users.role, 'student'),
        sql`${users.updatedAt} > ${thirtyDaysAgo}`
      ));

    return {
      totalStudents: totalResult.count,
      activeStudents: activeResult.count,
    };
  }

  async getCourseStats(): Promise<{ totalCourses: number; totalEnrollments: number }> {
    const [coursesResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(courses)
      .where(eq(courses.isActive, true));

    const [enrollmentsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(courseEnrollments);

    return {
      totalCourses: coursesResult.count,
      totalEnrollments: enrollmentsResult.count,
    };
  }

  async getInternshipStats(): Promise<{ totalInternships: number; totalApplications: number }> {
    const [internshipsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(internships)
      .where(eq(internships.isActive, true));

    const [applicationsResult] = await db
      .select({ count: sql<number>`count(*)` })
      .from(internshipApplications);

    return {
      totalInternships: internshipsResult.count,
      totalApplications: applicationsResult.count,
    };
  }
}

export const storage = new DatabaseStorage();
