import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const state = {
    tasks: []
};

const getters = {
    tasks(state) {
        const tasksBySubject = state.tasks.reduce((tasksBySubject, task) => {
          if (tasksBySubject[task.subjectId._id]) {
            tasksBySubject[task.subjectId._id].push(task);
          } else {
            tasksBySubject[task.subjectId._id] = [task];
          }
          return tasksBySubject;
        }, {});
        let tasksByTheme = [];
        for (let key in tasksBySubject) {
          tasksByTheme.push(tasksBySubject[key].reduce((tasksByTheme, task) => {
            const index = tasksByTheme.findIndex((arrOfTasks) => arrOfTasks.findIndex((_task) => _task.theme._id === task.theme._id) >= 0);
            if (index >= 0) tasksByTheme[index].push(task);
            else tasksByTheme[tasksByTheme.length] = [task];
            return tasksByTheme
          }, []));
        }
        let tasksByThemeBySubTheme = [];
        tasksByTheme.forEach((tasks) => {
          tasks.sort((task1, task2) => {
            if (task1[0].theme.order < task2[0].theme.order) return -1;
            else if (task1[0].theme.order > task2[0].theme.order) return 1;
            else return 0;
          });
          tasks.forEach(tasks => {
            tasks.sort((task1, task2) => {
              if (task1.order < task2.order) return -1;
              else if (task1.order > task2.order) return 1;
              else return 0;
            });
            tasks.forEach(task => tasksByThemeBySubTheme.push(task));
          });
        });
        return tasksByThemeBySubTheme;
    }
};

const mutations = {
    SET_TASKS(state, payload) {
        state.tasks = payload;
    }
};

const actions = {
    createTask({ commit }, payload) {
        return new Promise((resolve, reject) => {
            return Vue.http.post('task', payload)
                .then(data => resolve(data.body))
                .catch(err => reject(err));
        });
    },
    getTasksByTeacherId({ commit }, payload) {
      Vue.http.get(`tasks/teacher/${payload.teacherId}`)
          .then(data => commit('SET_TASKS', data.body))
          .catch(err => console.log(err));
    },
    getFilteredTasks({ commit }, { schoolId, fetchType, teacherId, classNumber, subjectId, themeId, difficultyLevel }) {
      Vue.http.get(`tasks/${schoolId}/${fetchType}/${teacherId}/${classNumber}/${subjectId}/${themeId}/${difficultyLevel}`)
            .then(data => commit('SET_TASKS', data.body))
            .catch(err => console.log(err));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
