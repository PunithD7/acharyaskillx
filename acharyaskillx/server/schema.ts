import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, decimal, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// User roles enum
export const userRoles = ['student', 'faculty', 'recruiter'] as const;
export type UserRole = typeof userRoles[number];

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  role: text("role").$type<UserRole>().notNull(),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Student profiles
export const studentProfiles = pgTable("student_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  university: text("university"),
  degree: text("degree"),
  graduationYear: integer("graduation_year"),
  gpa: decimal("gpa", { precision: 3, scale: 2 }),
  skills: jsonb("skills").$type<string[]>().default([]),
  resumeUrl: text("resume_url"),
  portfolioUrl: text("portfolio_url"),
  linkedinUrl: text("linkedin_url"),
  githubUrl: text("github_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Faculty profiles
export const facultyProfiles = pgTable("faculty_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  institution: text("institution"),
  department: text("department"),
  position: text("position"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Recruiter profiles
export const recruiterProfiles = pgTable("recruiter_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  company: text("company").notNull(),
  position: text("position"),
  companySize: text("company_size"),
  industry: text("industry"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Courses
export const courses = pgTable("courses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category"),
  level: text("level"), // beginner, intermediate, advanced
  duration: text("duration"),
  imageUrl: text("image_url"),
  rating: decimal("rating", { precision: 2, scale: 1 }),
  price: decimal("price", { precision: 10, scale: 2 }),
  isActive: boolean("is_active").default(true),
  createdBy: varchar("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Course enrollments
export const courseEnrollments = pgTable("course_enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  courseId: varchar("course_id").references(() => courses.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  progress: integer("progress").default(0), // 0-100
  completedAt: timestamp("completed_at"),
  enrolledAt: timestamp("enrolled_at").defaultNow(),
});

// Internships/Jobs
export const internships = pgTable("internships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  company: text("company").notNull(),
  location: text("location"),
  type: text("type"), // internship, job, part-time
  duration: text("duration"),
  salary: text("salary"),
  requirements: jsonb("requirements").$type<string[]>().default([]),
  skills: jsonb("skills").$type<string[]>().default([]),
  isRemote: boolean("is_remote").default(false),
  isActive: boolean("is_active").default(true),
  applicationDeadline: timestamp("application_deadline"),
  postedBy: varchar("posted_by").references(() => users.id).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Internship applications
export const internshipApplications = pgTable("internship_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  internshipId: varchar("internship_id").references(() => internships.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  status: text("status").default('pending'), // pending, shortlisted, rejected, hired
  coverLetter: text("cover_letter"),
  appliedAt: timestamp("applied_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Competitions/Hackathons
export const competitions = pgTable("competitions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type"), // hackathon, competition, contest
  category: text("category"),
  duration: text("duration"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  registrationDeadline: timestamp("registration_deadline"),
  imageUrl: text("image_url"),
  prizes: jsonb("prizes").$type<string[]>().default([]),
  rules: text("rules"),
  isActive: boolean("is_active").default(true),
  organizedBy: varchar("organized_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Competition registrations
export const competitionRegistrations = pgTable("competition_registrations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  competitionId: varchar("competition_id").references(() => competitions.id).notNull(),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  teamName: text("team_name"),
  teamMembers: jsonb("team_members").$type<string[]>().default([]),
  registeredAt: timestamp("registered_at").defaultNow(),
});

// AI Interview sessions
export const aiInterviewSessions = pgTable("ai_interview_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  studentId: varchar("student_id").references(() => users.id).notNull(),
  jobRole: text("job_role").notNull(),
  difficulty: text("difficulty").default('medium'), // easy, medium, hard
  questions: jsonb("questions").$type<Array<{question: string, answer: string, timeSpent: number}>>().default([]),
  overallScore: integer("overall_score"), // 0-100
  communicationScore: integer("communication_score"), // 0-100
  technicalScore: integer("technical_score"), // 0-100
  confidenceScore: integer("confidence_score"), // 0-100
  feedback: text("feedback"),
  duration: integer("duration"), // in minutes
  status: text("status").default('in_progress'), // in_progress, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  studentProfile: one(studentProfiles, {
    fields: [users.id],
    references: [studentProfiles.userId],
  }),
  facultyProfile: one(facultyProfiles, {
    fields: [users.id],
    references: [facultyProfiles.userId],
  }),
  recruiterProfile: one(recruiterProfiles, {
    fields: [users.id],
    references: [recruiterProfiles.userId],
  }),
  courseEnrollments: many(courseEnrollments),
  internshipApplications: many(internshipApplications),
  competitionRegistrations: many(competitionRegistrations),
  aiInterviewSessions: many(aiInterviewSessions),
  createdCourses: many(courses),
  postedInternships: many(internships),
  organizedCompetitions: many(competitions),
}));

export const studentProfilesRelations = relations(studentProfiles, ({ one }) => ({
  user: one(users, {
    fields: [studentProfiles.userId],
    references: [users.id],
  }),
}));

export const facultyProfilesRelations = relations(facultyProfiles, ({ one }) => ({
  user: one(users, {
    fields: [facultyProfiles.userId],
    references: [users.id],
  }),
}));

export const recruiterProfilesRelations = relations(recruiterProfiles, ({ one }) => ({
  user: one(users, {
    fields: [recruiterProfiles.userId],
    references: [users.id],
  }),
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  creator: one(users, {
    fields: [courses.createdBy],
    references: [users.id],
  }),
  enrollments: many(courseEnrollments),
}));

export const courseEnrollmentsRelations = relations(courseEnrollments, ({ one }) => ({
  course: one(courses, {
    fields: [courseEnrollments.courseId],
    references: [courses.id],
  }),
  student: one(users, {
    fields: [courseEnrollments.studentId],
    references: [users.id],
  }),
}));

export const internshipsRelations = relations(internships, ({ one, many }) => ({
  recruiter: one(users, {
    fields: [internships.postedBy],
    references: [users.id],
  }),
  applications: many(internshipApplications),
}));

export const internshipApplicationsRelations = relations(internshipApplications, ({ one }) => ({
  internship: one(internships, {
    fields: [internshipApplications.internshipId],
    references: [internships.id],
  }),
  student: one(users, {
    fields: [internshipApplications.studentId],
    references: [users.id],
  }),
}));

export const competitionsRelations = relations(competitions, ({ one, many }) => ({
  organizer: one(users, {
    fields: [competitions.organizedBy],
    references: [users.id],
  }),
  registrations: many(competitionRegistrations),
}));

export const competitionRegistrationsRelations = relations(competitionRegistrations, ({ one }) => ({
  competition: one(competitions, {
    fields: [competitionRegistrations.competitionId],
    references: [competitions.id],
  }),
  student: one(users, {
    fields: [competitionRegistrations.studentId],
    references: [users.id],
  }),
}));

export const aiInterviewSessionsRelations = relations(aiInterviewSessions, ({ one }) => ({
  student: one(users, {
    fields: [aiInterviewSessions.studentId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertStudentProfileSchema = createInsertSchema(studentProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertFacultyProfileSchema = createInsertSchema(facultyProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRecruiterProfileSchema = createInsertSchema(recruiterProfiles).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertInternshipSchema = createInsertSchema(internships).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCompetitionSchema = createInsertSchema(competitions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertAiInterviewSessionSchema = createInsertSchema(aiInterviewSessions).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertStudentProfile = z.infer<typeof insertStudentProfileSchema>;
export type StudentProfile = typeof studentProfiles.$inferSelect;

export type InsertFacultyProfile = z.infer<typeof insertFacultyProfileSchema>;
export type FacultyProfile = typeof facultyProfiles.$inferSelect;

export type InsertRecruiterProfile = z.infer<typeof insertRecruiterProfileSchema>;
export type RecruiterProfile = typeof recruiterProfiles.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertInternship = z.infer<typeof insertInternshipSchema>;
export type Internship = typeof internships.$inferSelect;

export type InsertCompetition = z.infer<typeof insertCompetitionSchema>;
export type Competition = typeof competitions.$inferSelect;

export type InsertAiInterviewSession = z.infer<typeof insertAiInterviewSessionSchema>;
export type AiInterviewSession = typeof aiInterviewSessions.$inferSelect;

export type CourseEnrollment = typeof courseEnrollments.$inferSelect;
export type InternshipApplication = typeof internshipApplications.$inferSelect;
export type CompetitionRegistration = typeof competitionRegistrations.$inferSelect;
