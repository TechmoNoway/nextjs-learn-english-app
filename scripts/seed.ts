import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.userSubscription);

    await db.insert(schema.courses).values([
      { id: 1, title: "United Kingdom", imageSrc: "/uk.svg" },
      { id: 2, title: "Spanish", imageSrc: "/es.svg" },
      { id: 3, title: "French", imageSrc: "/fr.svg" },
      { id: 4, title: "Croatian", imageSrc: "/hr.svg" },
      { id: 5, title: "Italian", imageSrc: "/it.svg" },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Learn the basic of English",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 learn the basic of English
        order: 1,
        title: "Start lesson",
      },
      {
        id: 2,
        unitId: 1,
        order: 2,
        title: "Simple Sentences",
      },
      {
        id: 3,
        unitId: 1,
        order: 3,
        title: "Basic Pronouns",
      },
      {
        id: 4,
        unitId: 1,
        order: 4,
        title: "Common Adjectives",
      },
    ]);

    //lesson 1: Start
    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: 'Which one of these is the "the man"?',
      },
      {
        id: 2,
        lessonId: 1,
        type: "ASSIST",
        order: 2,
        question: '"The woman"',
      },
      {
        id: 3,
        lessonId: 1,
        type: "ASSIST",
        order: 3,
        question: 'Which one of these is the "the robot"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1,
        imageSrc: "/man.svg",
        correct: true,
        text: "Man",
        audioSrc: "/uk_man.mp3",
      },
      {
        id: 2,
        challengeId: 1,
        imageSrc: "/woman.svg",
        correct: false,
        text: "Woman",
        audioSrc: "/uk_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1,
        imageSrc: "/robot.svg",
        correct: false,
        text: "Robot",
        audioSrc: "/uk_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 4,
        challengeId: 2,
        imageSrc: "",
        correct: false,
        text: "Man",
        audioSrc: "/uk_man.mp3",
      },
      {
        id: 5,
        challengeId: 2,
        imageSrc: "",
        correct: true,
        text: "Woman",
        audioSrc: "/uk_woman.mp3",
      },
      {
        id: 6,
        challengeId: 2,
        imageSrc: "",
        correct: false,
        text: "Robot",
        audioSrc: "/uk_robot.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 7,
        challengeId: 3,
        imageSrc: "/man.svg",
        correct: false,
        text: "Man",
        audioSrc: "/uk_man.mp3",
      },
      {
        id: 8,
        challengeId: 3,
        imageSrc: "/woman.svg",
        correct: false,
        text: "Woman",
        audioSrc: "/uk_woman.mp3",
      },
      {
        id: 9,
        challengeId: 3,
        imageSrc: "/robot.svg",
        correct: true,
        text: "Robot",
        audioSrc: "/uk_robot.mp3",
      },
    ]);

    //lesson 2: Simple Sentences (No audio/images for options)
    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: "SELECT",
        order: 1,
        question: "Which of these is a complete sentence?",
      },
      {
        id: 5,
        lessonId: 2,
        type: "ASSIST",
        order: 2,
        question: 'Identify the verb in "She walks."',
      },
      {
        id: 6,
        lessonId: 2,
        type: "ASSIST",
        order: 3,
        question: 'Complete the sentence: "The cat is ____."',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 10,
        challengeId: 4,
        correct: true,
        text: "The dog runs.",
      },
      {
        id: 11,
        challengeId: 4,
        correct: false,
        text: "Runs dog.",
      },
      {
        id: 12,
        challengeId: 4,
        correct: false,
        text: "Dog.",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 13,
        challengeId: 5,
        correct: false,
        text: "She",
      },
      {
        id: 14,
        challengeId: 5,
        correct: true,
        text: "walks",
      },
      {
        id: 15,
        challengeId: 5,
        correct: false,
        text: ".",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 16,
        challengeId: 6,
        correct: false,
        text: "quickly",
      },
      {
        id: 17,
        challengeId: 6,
        correct: true,
        text: "sleeping",
      },
      {
        id: 18,
        challengeId: 6,
        correct: false,
        text: "house",
      },
    ]);

    // Lesson 3: Basic Pronouns (No audio/images for options)
    await db.insert(schema.challenges).values([
      {
        id: 7,
        lessonId: 3,
        type: "SELECT",
        order: 1,
        question: 'Which pronoun replaces "John"?',
      },
      {
        id: 8,
        lessonId: 3,
        type: "ASSIST",
        order: 2,
        question: 'Which pronoun replaces "Mary and I"?',
      },
      {
        id: 9,
        lessonId: 3,
        type: "ASSIST",
        order: 3,
        question: 'Which pronoun replaces "the table"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 19,
        challengeId: 7,
        correct: false,
        text: "She",
      },
      {
        id: 20,
        challengeId: 7,
        correct: true,
        text: "He",
      },
      {
        id: 21,
        challengeId: 7,
        correct: false,
        text: "It",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 22,
        challengeId: 8,
        correct: false,
        text: "They",
      },
      {
        id: 23,
        challengeId: 8,
        correct: true,
        text: "We",
      },
      {
        id: 24,
        challengeId: 8,
        correct: false,
        text: "You",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 25,
        challengeId: 9,
        correct: false,
        text: "He",
      },
      {
        id: 26,
        challengeId: 9,
        correct: false,
        text: "She",
      },
      {
        id: 27,
        challengeId: 9,
        correct: true,
        text: "It",
      },
    ]);

    // Lesson 4: Common Adjectives (No audio/images for options)
    await db.insert(schema.challenges).values([
      {
        id: 10,
        lessonId: 4,
        type: "SELECT",
        order: 1,
        question: "Which word describes size?",
      },
      {
        id: 11,
        lessonId: 4,
        type: "ASSIST",
        order: 2,
        question: "Which word describes temperature?",
      },
      {
        id: 12,
        lessonId: 4,
        type: "ASSIST",
        order: 3,
        question: "Which word describes feeling?",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 28,
        challengeId: 10,
        correct: true,
        text: "Big",
      },
      {
        id: 29,
        challengeId: 10,
        correct: false,
        text: "Red",
      },
      {
        id: 30,
        challengeId: 10,
        correct: false,
        text: "Happy",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 31,
        challengeId: 11,
        correct: false,
        text: "Fast",
      },
      {
        id: 32,
        challengeId: 11,
        correct: true,
        text: "Cold",
      },
      {
        id: 33,
        challengeId: 11,
        correct: false,
        text: "Nice",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 34,
        challengeId: 12,
        correct: false,
        text: "Long",
      },
      {
        id: 35,
        challengeId: 12,
        correct: false,
        text: "Blue",
      },
      {
        id: 36,
        challengeId: 12,
        correct: true,
        text: "Sad",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();
