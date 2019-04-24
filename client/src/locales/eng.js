export default {
  utils: {
    button: {
      close: 'Close',
      cancel: 'Cancel',
      delete: 'Delete',
      ok: 'OK',
      save: 'Save',
      create: 'Create',
      update: 'Update',
      no: 'No',
      yes: 'Yes',
      review: 'Review',
      uploadText: 'Upload text',
      saveText: 'Save text',
      savePDF: 'Save PDF',
      execute: 'Execute',
      swap: 'Swap',
      activeTask: 'Active Task',
      startTask: 'Start Task',
      addOneInputBelow: 'Add one input below',
      deleteThisInput: 'Delete this input',
      filterTasks: 'Filter tasks',
      prev: 'Prev',
      next: 'Next'
    },
    labels: {
      search: 'Search',
      selectView: 'Select View',
      name: 'Name',
      firstName: 'First name',
      midName: 'Mid name',
      lastName: 'Last name',
      email: 'Email',
      gender: 'Gender',
      date: 'Date',
      birthday: 'Birthday',
      password: 'Password',
      class: 'Class',
      group: 'Group',
      subject: 'Subject',
      selectSubject: 'Select Subject',
      selectLecture: 'Select Lecture',
      selectTask: 'Select Task',
      selectType: 'Select type',
      selectTheme: 'Select theme',
      selectDifficultyLevel: 'Select difficulty level',
      selectClass: 'Select class',
      planName: 'Plan Name',
      theme: 'Theme',
      themeName: 'Theme name',
      themeOrder: 'Theme order',
      type: 'Type',
      countOfVariants: 'Count Of Variants',
      taskOrder: 'Task Order',
      exercise: 'Exercise',
      fullSolution: 'Full Solution',
      yourAnswer: 'Your answer'
    },
    hint: {
      indicatesRequiredField: '*indicates required field'
    },
    text: {
      output: 'Output:'
    },
    action: {
      success: 'Success',
      errorTryAgainLater: 'Error! Try again later please.'
    },
    data: {
      noDataYet: 'No Data yet',
      noDataAvailable: 'No data available',
      noResultYet: 'No result yet',
      noSearchResult: 'Your search for "{0}" found no results.'
    }
  },
  navbar: {
    profile: 'view profile',
    createHeadTeacher: 'Create Head Teacher',
    createClass: 'Create Class',
    createMember: 'Create Student/Teacher',
    subjects: 'Subjects',
    gradebook: 'Gradebook',
    timetableAndPlan: 'timetable and plan',
    schoolLearningStuff: 'school learning stuff',
    group: 'group',
    groups: 'groups',
    school: 'school  {0}',
    locale: 'locale',
    logOut: 'log out'
  },
  profile: {
    editProfile: 'Edit profile',
    accountData: 'Account data',
    userData: {
      fullName: 'Full name',
      gender: 'Gender',
      role: 'Role',
      email: 'Email',
      birthday: 'Birthday',
      age: 'Age'
    },
    directorData: {
      school: 'School'
    },
    teacherData: {
      subjects: 'Subjects'
    },
    studentData: {
      AVGSRMark: 'AVG SR Mark',
      AVGKRMark: 'AVG KR Mark',
      AVGSRDispersion: 'AVG SR Dispersion',
      AVGKRDispersion: 'AVG KR Dispersion',
      school: 'School'
    },
    changeProfile: {
      userProfile: 'User Profile'
    }
  },
  director: {
    createHeadTeacher: {
      newHeadTeacher: 'New Head Teacher'
    },
    createClass: {
      newClass: 'New Class'
    }
  },
  headTeacher: {
    createStudent: {
      newStudent: 'New Student'
    },
    createTeacher: {
      newTeacher: 'New Teacher',
      addField: 'Add one field to teacher timetable',
      deleteField: 'Delete one field from teacher timetable'
    }
  },
  teacher: {
    timetableAndPlan: {
      timetable: {
        name: 'Timetable',
        headers: {
          subject: 'Subject',
          group: 'Group',
          plan: 'Plan'
        },
        createPlan: {
          name: 'Create Plan',
          addField: 'Add one field',
          deleteField: 'Delete last field'
        },
        choosePlan: {
          name: 'Choose Plan'
        }
      },
      plan: {
        name: 'Plan',
        lections: 'Lections',
        tasks: 'Tasks',
        date: 'Date',
        editPlan: 'Edit Plan',
        deletePlan: 'Delete Plan'
      }
    }
  },
  student: {
    subjects: {
      planNotReady: 'Plan not ready yet',
      showPlan: 'Show Plan',
      plan: {
        name: 'Plan',
        lections: 'Lections',
        tasks: 'Tasks',
        date: 'Date'
      }
    },
    gradeBook: {
      sr: {
        name: 'SR\'s',
        teacher: 'Teacher',
        tasks: 'Tasks',
        task: 'Task',
        mark: 'Mark',
        fourNumbers: 'Four Numbers'
      },
      kr: {
        name: 'KR\'s',
        teacher: 'Teacher',
        tasks: 'Tasks',
        task: 'Task',
        mark: 'Mark',
        review: 'Review'
      }
    }
  },
  groups: {
    createGroup: {
      name: 'Create Group',
      newGroup: 'New Group',
      groupName: 'Group name',
      course: 'Course'
    },
    groupsTable: {
      name: 'groups',
      groupName: 'Group name',
      numberOfStudents: 'Number of students',
      numberOfTeachers: 'Number of teachers',
      AVGSRMark: 'AVG SR Mark',
      AVGKRMark: 'AVG KR Mark',
      AVGSRDispersion: 'AVG SR Dispersion',
      AVGKRDispersion: 'AVG KR Dispersion'
    }
  },
  group: {
    name: 'Group',
    AVGSRMark: 'AVG SR Mark',
    AVGKRMark: 'AVG KR Mark',
    AVGSRDispersion: 'AVG SR Dispersion',
    AVGKRDispersion: 'AVG KR Dispersion',
    students: 'Students',
    teachers: 'Teachers',
    FullName: 'Full Name',
    email: 'Email',
    marksSR: 'Marks (SR)',
    marksKR: 'Marks (KR)',
    time: 'Time',
    review: 'Review'
  },
  schoolLearningStuff: {
    tasks: {
      name: 'Tasks',
      createTask: {
        name: 'Create Task',
        newTask: 'New Task',
        taskName: 'Task Name',
        difficultyLevel: 'Difficulty Level',
        selectExerciseNumber: 'Select Exercise Number',
        addExerciseAfter: 'Add Exercise after {0}',
        addExerciseBefore: 'Add Exercise before {0}',
        addOneExerciseBelow: 'Add One Exercise Below',
        exerciseNumber: 'Exercise №{0}'
      },
      tasksTable: {
        filters: {
          name: 'Filters',
          findInThisSchool: 'Find in this school',
          findInAllSchools: 'Find in all schools'
        },
        headers: {
          taskNumber: '№ Task',
          task: 'Task',
          class: 'Class',
          difficultyLevel: 'Difficulty Level',
          subject: 'Subject',
          themeNumber: '№ Theme',
          theme: 'Theme',
          type: 'Type',
          teacher: 'Teacher',
          school: 'School'
        }
      }
    },
    lectures: {
      name: 'Lectures'
    },
    subjectsAndThemes: {
      name: 'Subjects and Themes',
      addThemes: 'Add themes',
      addThemesTo: 'Add themes to {0}',
      addOneTheme: 'Add one theme',
      themesHeaders: {
        name: 'Name',
        class: 'Class',
        order: 'Order'
      }
    },
    plans: {
      name: 'Plans',
      createPlan: {
        name: 'Create Plan'
      },
      plansTable: {
        filters: {
          name: 'Filters',
          filterPlans: 'Filter Plans',
          findInThisSchool: 'Find in this school',
          findInAllSchools: 'Find in all schools'
        },
        headers: {
          plan: 'Plan',
          subject: 'Subject',
          teacher: 'Teacher',
          school: 'School'
        }
      }
    }
  },
  task: {
    exerciseNumber: 'Exercise {0}',
    exerciseNotStartedYet: 'You have not started this exercise yet',
    check: 'Check',
    giveUp: 'Give up',
    finish: 'Finish'
  },
  tips: {
    extended: 'Extended',
    constants: 'Constants',
    symbols: 'Symbols',
    numbersSetsIntequality: 'Numbers, sets, intequality',
    otherSymbols: 'Other symbols',
    greekLowercase: 'Greek lowercase',
    greekUppercase: 'Greek uppercase',
    numbersPolynomials: 'Numbers, polynomials',
    numbers: 'Numbers',
    integers: 'Integers',
    fractionsAndRationalFunctions: 'Fractions and rational functions',
    polynomials: 'Polynomials',
    matrices: 'Matrices',
    matricesAndLinearSystem: 'Matrices and linear system',
    matricesOverZ: 'Matrices over Z',
    linearProgramming: 'Linear programming (Q, R64, R)',
    functions: 'Functions',
    elementaryFunctions: 'Elementary functions',
    otherFunctions: 'Other functions',
    equationsInequalitiesAndSystems: 'Equations, inequalities and systems of equations and inequalities',
    differentialEquationsAndSystems: 'Differential equations and systems',
    probabilityTheory: 'Probability theory',
    statistics: 'Statistics',
    idempotentAlgebras: 'Idempotent (tropical) algebras',
    algebraicManipulations: 'Algebraic manipulations',
    transcendentalManipulations: 'Transcendental manipulations',
    graphicsAndTables: 'Graphics and tables',
    plots2DAndTables: '2D plots and tables',
    plots3D: '3D plots',
    parametricPlots3D: 'Parametric 3D plots',
    graphProblems: 'Graph problems',
    tableInText: 'Table in text',
    cluster: 'Cluster'
  }
};
