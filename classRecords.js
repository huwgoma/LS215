// Class Record Summary 
// At the end of each term, teachers need to create a summary for students in 
//  their class, based on weighted exam/exercise scores.

// Exams are worth 65%, and exercises are worth 35%.
// - Each term has 4 exams and several (?) exercises.
// - Each exam has a max score of 100.
// - Exercises differ in max score and counts.
//   - The total maximum score for all exercises in a term is 100, regardless of
//     exercise count.
//     eg. [ 30, 20, 10, 20, 20 ] => 100, or [ 20, 30, 50 ] => 100

// Student Grade Calculation:
// - Average Score from 4 exams
// - Total Score from exercises
// 65% x ExamAverage + 35% x ExerciseSum
// - Then determine the letter grade from the percent grade
// Percent Grade	Letter Equivalent
// 93 - 100	A
// 85 - 92	B
// 77 - 84	C
// 69 - 76	D
// 60 - 68	E
// 0  - 59	F

// ==============================================================================
// Input: studentScores: A nested Object of student Objects.
// - Each student Object has:
//   - ID property (number)
//   - Scores property (object). Each score object has:
//     - Exams property: Array of 4 numbers corresponding to that student's score
//       on each of the 4 exams
//     - Exercises property: Array of ___ numbers corresponding to that student's
//       score on each of the ___ exercises.

// Output: a new Object with 2 properties:
// - studentGrades: An array of strings representing each student's final 
//    calculated grade in the format 'gradeNumber (gradeLetter)'
// - exams: An array of 4 objects representing the statistics for each exam;
//    each exam object has:
//    - average, minimum, and maximum score among all students for that exam.

// Data:
// - studentGrades: Calculate the final grade for each student, build a string, and
//   map the resulting value to an array.
//   * Map over studentScore values => To get each student object.
//   - To calculate final grade from student.scores:
//     - Exam Portion: AVG(student.scores.exams) * 0.65
//     - Exercise Portion: SUM(student.scores.exercises) * 0.35
//   - Final Grade: Exam Portion + Exercise Portion
//   - Letter Grade: Determine from PERCENT_TO_LETTER (or similar)
//     - eg. grade between? 93, 100 => A; between? 85, 92 => B; etc...
//   - Build the string of 'FinalGrade (LetterGrade)' and return to map array

// - exams: Calculate the average, minimum, and maximum score for each exam, build
//   an object, and map the resulting value to a new array.
//   * Loop 4 times (# of exams). For each loop:
//   - Extract the corresponding exam score for all students. For example,
//     if i = 0 (1st iteration), iterate through examScores and retrieve 
//     exam[i] -> Yields 90, 50, 88, 100, and 50. 
//   - store in array [ 90, 50, 88, 100, 50 ]
//   - Calculate the average, minimum, and maximum from array
//     - average: SUM / # of elements (# of students)
//     - minimum/maximum: Sort exam1scores by numeric value then take the first
//       and last elements.
// [90, 95, 100, 80]
// [50, 70, 90, 100]
// [88, 87, 88, 89]
// [100, 100, 100, 100]
// [50, 80, 60, 90]


function generateClassRecordSummary(scores) {
  let studentGrades = calculateStudentGrades(Object.values(scores));

  let examScores = Object.values(scores).map(student => student.scores.exams);
  let examStats = calculateExamStats(examScores);

  return { studentGrades, exams: examStats };
}

// Part 1 - Student Grades
function calculateStudentGrades(students) {
  return students.map(student => {
    let finalGrade = Math.round(calculateFinalGrade(student.scores));
    let letterGrade = percentToLetter(finalGrade);

    return `${finalGrade} (${letterGrade})`;
  });
}

function calculateFinalGrade(scores) {
  const EXAM_WEIGHT = 0.65;
  const EXERCISE_WEIGHT = 0.35;

  let weightedExamScore = average(scores.exams) * EXAM_WEIGHT;
  let weightedExerciseScore = sum(scores.exercises) * EXERCISE_WEIGHT;

  return weightedExamScore + weightedExerciseScore;
}

function percentToLetter(grade) {
  const LETTER_GRADE_MINIMUMS = { 
    A: 93, B: 85, C: 77, D: 69, E: 60, F: 0,
  }

  if (grade >= LETTER_GRADE_MINIMUMS['A']) {
    return 'A';
  } else if (grade >= LETTER_GRADE_MINIMUMS['B']) {
    return 'B';
  } else if (grade >= LETTER_GRADE_MINIMUMS['C']) {
    return 'C';
  } else if (grade >= LETTER_GRADE_MINIMUMS['D']) {
    return 'D';
  } else if (grade >= LETTER_GRADE_MINIMUMS['E']) {
    return 'E';
  } else {
    return 'F';
  }
}

// Part 2 - Exam Stats
function calculateExamStats(examScores) {
  return examScores[0].map((_element, index) => {
    let currentExamScores = examScores.map(studentExams => studentExams[index]);
    let examAverage = average(currentExamScores);
    let [ examMinimum, examMaximum ] = minMax(currentExamScores);

    return { average: examAverage, minimum: examMinimum, maximum: examMaximum };
  })
}

// Generic Helpers
function average(numbers) {
  let rawAverage = sum(numbers) / numbers.length;

  return parseFloat(rawAverage.toFixed(1));
}

function sum(numbers) {
  return numbers.reduce((memo, number) => memo + number, 0);
}

function minMax(array) {
  let sortedArray = array.toSorted((a, b) => Number(a) - Number(b));

  let min = sortedArray[0];
  let max = sortedArray[sortedArray.length - 1];
  
  return [ min, max ];
}


// Example:
let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

console.log(generateClassRecordSummary(studentScores));
// outputs:
// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//     { average: 75.6, minimum: 50, maximum: 100 },
//     { average: 86.4, minimum: 70, maximum: 100 },
//     { average: 87.6, minimum: 60, maximum: 100 },
//     { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }