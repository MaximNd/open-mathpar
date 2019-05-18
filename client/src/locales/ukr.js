export default {
  utils: {
    button: {
      close: 'Закрити',
      cancel: 'Скасувати',
      delete: 'Видалити',
      ok: 'OK',
      save: 'Зберегти',
      create: 'Створити',
      update: 'Редагувати',
      no: 'Ні',
      yes: 'Так',
      review: 'Переглянути',
      uploadText: 'Завантажити текст',
      saveText: 'Зберегти текст',
      savePDF: 'Зберегти PDF',
      execute: 'Виконати',
      swap: 'Перемкнути',
      activeTask: 'Поточна вправа',
      startTask: 'Почати вправу',
      addOneInputBelow: 'Додати поле знизу',
      deleteThisInput: 'Видалити це поле',
      filterTasks: 'Фільтрувати завдання',
      prev: 'Попередня',
      next: 'Наступна'
    },
    labels: {
      search: 'Пошук',
      selectView: 'Вибрати режим перегляду',
      name: 'Назва',
      firstName: 'Ім\'я',
      midName: 'По батькові',
      lastName: 'Призвіще',
      email: 'Пошта',
      gender: 'Стать',
      date: 'Дата',
      birthday: 'День народження',
      password: 'Пароль',
      class: 'Клас',
      year: 'Рік',
      group: 'Група',
      subject: 'Предмет',
      selectSubject: 'Вибрати Предмет',
      selectLecture: 'Вибрати Лекцію',
      selectTask: 'Вибрати Завдання',
      selectType: 'Вибрати тип',
      selectYear: 'Вибрати рік',
      selectTheme: 'Вибрати тему',
      selectDifficultyLevel: 'Вибрати рівень складності',
      selectClass: 'Вибрати клас',
      planName: 'Назва плану',
      theme: 'Тема',
      themeName: 'Назва теми',
      themeOrder: 'Порядок теми',
      type: 'тип',
      countOfVariants: 'Кількість варіантів',
      taskOrder: 'Порядок завдання',
      exercise: 'Вправа',
      fullSolution: 'Повне рішення',
      yourAnswer: 'Ваша відповідь'
    },
    hint: {
      indicatesRequiredField: '*вказує она бов\'язкові для заповнення поля'
    },
    text: {
      output: 'Вивід:'
    },
    action: {
      success: 'Збережено',
      errorTryAgainLater: 'Помилка! Спробуйте пізніше, будь ласка.'
    },
    data: {
      noDataYet: 'Даних ще немає',
      noDataAvailable: 'Немає даних',
      noResultYet: 'Результату ще немає',
      noSearchResult: 'Пошук за запитом "{0}" не дав результатів.'
    }
  },
  navbar: {
    profile: 'Профіль',
    createDean: 'Додати декана',
    createMethodist: 'Додати методиста',
    createHeadTeacher: 'Створити завуча',
    createSpecialty: 'Створити спеціальність',
    createClass: 'створити клас',
    createMember: 'Створити Учня/Вчителя',
    subjects: 'Предмети',
    gradebook: 'Оцінки',
    timetableAndPlan: 'Розклад і план',
    schoolLearningStuff: 'шкільний навчальний матеріал',
    universityLearningStuff: 'навчальний матеріал університету',
    group: 'група',
    groups: 'групи',
    school: 'школа {0}',
    university: 'університет',
    locale: 'мова',
    logOut: 'Вийти'
  },
  profile: {
    editProfile: 'Редагувати профіль',
    accountData: 'Данні профілю',
    university: 'Університет',
    userData: {
      fullName: 'Повне ім\'я',
      gender: 'Стать',
      role: 'Роль',
      email: 'Пошта',
      birthday: 'День народження',
      age: 'Вік'
    },
    directorData: {
      school: 'Школа'
    },
    teacherData: {
      subjects: 'Предмети'
    },
    studentData: {
      AVGSRMark: 'Середня оцінка за самостійні роботи',
      AVGKRMark: 'Середня оцінка за контрольні роботи',
      AVGSRDispersion: 'Середня дисперсія за самостійні роботи',
      AVGKRDispersion: 'Середня дисперсія за контрольні роботи',
      school: 'Школа'
    },
    changeProfile: {
      userProfile: 'Редагувати Профіль'
    }
  },
  director: {
    createHeadTeacher: {
      newHeadTeacher: 'Новий Завуч'
    },
    createClass: {
      newClass: 'Новий Клас'
    }
  },
  headTeacher: {
    createStudent: {
      newStudent: 'Новий Учень'
    },
    createTeacher: {
      newTeacher: 'Новий Вчитель',
      addField: 'Додати одне поле до розкладу вчителя',
      deleteField: 'Видалити одне поле із розкладу вчителя'
    }
  },
  teacher: {
    timetableAndPlan: {
      timetable: {
        name: 'Розклад',
        headers: {
          subject: 'Предмет',
          group: 'Група',
          plan: 'План'
        },
        createPlan: {
          name: 'Створити План',
          addField: 'Додати поле',
          deleteField: 'Видалити останне поле'
        },
        choosePlan: {
          name: 'Вибрати План'
        }
      },
      plan: {
        name: 'План',
        lections: 'Лекції',
        tasks: 'Завдання',
        date: 'Дата',
        editPlan: 'Редагувати План',
        deletePlan: 'Видалити План'
      }
    }
  },
  student: {
    subjects: {
      planNotReady: 'План ще не готовий',
      showPlan: 'Показати план',
      plan: {
        name: 'План',
        lections: 'Лекції',
        tasks: 'Завдання',
        date: 'Дата'
      }
    },
    gradeBook: {
      sr: {
        name: 'Самостійні роботи',
        teacher: 'Вчитель',
        tasks: 'Завдання',
        task: 'Завдання',
        mark: 'Оцінка',
        fourNumbers: 'Чотири числа'
      },
      kr: {
        name: 'Контрольні роботи',
        teacher: 'Вчитель',
        tasks: 'Завдання',
        task: 'Завдання',
        mark: 'Оцінка',
        review: 'Переглянути'
      }
    }
  },
  groups: {
    createGroup: {
      name: 'Створити Групу',
      newGroup: 'Нова Група',
      groupName: 'Назва Групи',
      course: 'Курс'
    },
    groupsTable: {
      name: 'Групи',
      groupName: 'Назва Групи',
      numberOfStudents: 'Кількість учнів',
      numberOfTeachers: 'Кількість вчителів',
      AVGSRMark: 'Середня оцінка за самостійні роботи',
      AVGKRMark: 'Середня оцінка за контрольні роботи',
      AVGSRDispersion: 'Середня дисперсія за самостійні роботи',
      AVGKRDispersion: 'Середня дисперсія за контрольні роботи'
    }
  },
  group: {
    name: 'Група',
    AVGSRMark: 'Середня оцінка за самостійні роботи',
    AVGKRMark: 'Середня оцінка за контрольні роботи',
    AVGSRDispersion: 'Середня дисперсія за самостійні роботи',
    AVGKRDispersion: 'Середня дисперсія за контрольні роботи',
    students: 'Учні',
    teachers: 'Вчителя',
    FullName: 'Повне Ім\'я',
    email: 'Пошта',
    marksSR: 'Оцінки за самостійні роботи',
    marksKR: 'Оцінки за контрольні роботи',
    time: 'Час',
    review: 'Переглянути'
  },
  schoolLearningStuff: {
    tasks: {
      name: 'Завдання',
      createTask: {
        name: 'Створити Завдання',
        newTask: 'Нове Завдання',
        taskName: 'Назва Завдання',
        difficultyLevel: 'Рівень складності',
        selectExerciseNumber: 'Вибрвти номер вправи',
        addExerciseAfter: 'Додати вправу після {0}',
        addExerciseBefore: 'Додати вправу до {0}',
        addOneExerciseBelow: 'Додати вправу',
        exerciseNumber: 'Вправа №{0}'
      },
      tasksTable: {
        filters: {
          name: 'Фільтри',
          findInThisSchool: 'Шукати в вашій школі',
          findInAllSchools: 'Шукати в усіх школах',
          findInThisUniversity: 'Шукати у вашому університеті',
          findInAllUniversities: 'Шукати у всіх університетах'
        },
        headers: {
          taskNumber: '№ Завдання',
          task: 'Назва Завдання',
          class: 'Клас',
          year: 'Рік',
          difficultyLevel: 'Рівень Складності',
          subject: 'Предмет',
          themeNumber: '№ Теми',
          theme: 'Тема',
          type: 'Тип',
          teacher: 'Вчитель',
          school: 'Школа',
          university: 'Університет'
        }
      }
    },
    lectures: {
      name: 'Лекції'
    },
    subjectsAndThemes: {
      name: 'Предмети та Теми',
      addThemes: 'Додати Теми',
      addThemesTo: 'Додати теми до {0}',
      addOneTheme: 'Додати тему',
      themesHeaders: {
        name: 'Назва',
        class: 'Клас',
        year: 'Рік',
        order: 'Порядок'
      }
    },
    plans: {
      name: 'Плани',
      createPlan: {
        name: 'Створити План'
      },
      plansTable: {
        filters: {
          name: 'Фільтри',
          filterPlans: 'Фільтрувати плани',
          findInThisSchool: 'Шукати в вашій школі',
          findInAllSchools: 'Шукати в усіх школах',
          findInThisUniversity: 'Шукати у вашому університеті',
          findInAllUniversities: 'Шукати у всіх університетах'
        },
        headers: {
          plan: 'План',
          subject: 'Предмет',
          teacher: 'Вчитель',
          school: 'Школа',
          university: 'Університет'
        }
      }
    }
  },
  task: {
    exerciseNumber: 'Вправа {0}',
    exerciseNotStartedYet: 'Ви ще не почали цю вправу',
    check: 'Перевірити',
    giveUp: 'Показати відповідь',
    finish: 'Закінчити'
  },
  tips: {
    extended: 'Розширений режим',
    constants: 'Константи',
    symbols: 'Символи',
    numbersSetsIntequality: 'Числа, множини, нерівності, булеві оператори',
    otherSymbols: 'Інші символи',
    greekLowercase: 'Грецькі рядкові',
    greekUppercase: 'Грецькі заголовні',
    numbersPolynomials: 'Числа і поліноми',
    numbers: 'Числа',
    integers: 'Цілі числа',
    fractionsAndRationalFunctions: 'Дроби та раціональні функції',
    polynomials: 'Поліноми',
    matrices: 'Матриці',
    matricesAndLinearSystem: 'Матричнц функції',
    matricesOverZ: 'Матриці над Z',
    linearProgramming: 'Лінійне програмування (Q, R64, R)',
    functions: 'Функції',
    elementaryFunctions: 'Елементарні функції',
    otherFunctions: 'Інші функції',
    equationsInequalitiesAndSystems: 'Рівняння, нерівності і їх системи',
    differentialEquationsAndSystems: 'Диференціальні рівняння і їх системи',
    probabilityTheory: 'Функції теорії ймовірності',
    statistics: 'Функції математичної статистики',
    idempotentAlgebras: 'Ідемпотентна (тропічні) алгебра',
    algebraicManipulations: 'Перетворення Алгебри',
    transcendentalManipulations: 'Трансцендентні перетворення',
    graphicsAndTables: 'Графіки, таблиці',
    plots2DAndTables: '2D графіки і таблиці',
    plots3D: '3D графіки',
    parametricPlots3D: 'Параметричні поверхні',
    graphProblems: 'Графи',
    tableInText: 'Таблиця в тексті',
    cluster: 'Кластер'
  }
};
