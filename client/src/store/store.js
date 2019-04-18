/* eslint-disable */

import Vue from 'vue';
import Vuex from 'vuex';
import currentUser from './modules/currentUser';
import headTeacher from './modules/headTeacher';
import class_ from './modules/class';
import group from './modules/group';
import student from './modules/student';
import teacher from './modules/teacher';
import lection from './modules/lection';
import task from './modules/task';
import taskExecution from './modules/task_execution';
import plan from './modules/plan';
import dean from './modules/dean';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    currentUser,
    headTeacher,
    class_,
    group,
    student,
    teacher,
    lection,
    task,
    taskExecution,
    plan,
    dean,
  },
});
