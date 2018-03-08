import Vue from 'vue'
import Router from 'vue-router'
import Student from '../components/student/StudentContainer.vue';
import Profile from '../components/profile/ProfileContainer.vue';
// import StudentProfile from '../components/student/studentProfile/StudentProfileContainer.vue';
import StudentSubjects from '../components/student/studentSubjects/StudentSubjectsContainer.vue';
import StudentGradeBook from '../components/student/studentGradebook/StudentGradebookContainer.vue';
import Groups from '../components/groups/GroupsContainer.vue';
import Group from '../components/groups/GroupContainer.vue';
import School from '../components/school/SchoolContainer.vue';
import Teacher from '../components/teachers/TeacherContainer.vue';
// import TeacherProfile from '../components/teachers/teacherProfile/TeacherProfileContainer.vue';
import TeacherTimetableAndPlan from '../components/teachers/TeacherTimetableAndPlan/TeacherTimetableAndPlanContainer.vue';
import TasksAndLectures from '../components/tasksAndLectures/TasksAndLecturesContainer.vue';
import Task from '../components/tasksAndLectures/tasks/task/TaskContainer.vue';
import HeadTeacher from '../components/head-teachers/HeadTeacherContainer.vue';
// import HeadTeacherProfile from '../components/head-teachers/head-teacherProfile/headTeacherProfileContainer.vue'
import HeadTeacherCreateMember from '../components/head-teachers/createMember/CreateMemberContainer.vue';
import Director from '../components/director/DirectorContainer.vue';
// import DirectorProfile from '../components/director/directorProfile/DirectorProfileContainer.vue';
import DirectorCreateHeadTeacher from '../components/director/directorCreateHeadTeacher/DirectorCreateHeadTeacherContainer.vue';
import DirectorCreateClass from '../components/director/directorCreateClass/DirectorCreateClassContainer.vue';
import Login from '../components/auth/login/Login.vue';
import Register from '../components/auth/register/Register.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/student/:id',
      name: 'student',
      component: Student,
      children: [
        // { path: 'profile', name: 'student-profile', component: StudentProfile },
        { path: 'subjects', name: 'student-subjects', component: StudentSubjects },
        { path: 'gradebook', name: 'student-gradebook', component: StudentGradeBook }
      ]
    },
    {
      path: '/teacher/:id',
      name: 'teacher',
      component: Teacher,
      children: [
        // { path: 'profile', name: 'teacher-profile', component: TeacherProfile },
        { path: 'timetable_plan', name: 'teacher-timetable_plan', component: TeacherTimetableAndPlan }
        // { path: 'create-member', name: 'teacher-create-member', component: TeacherCreateMember } // TODO delete in teacher and add in headteacher
      ]
    },
    {
      path: '/head-teacher/:id',
      name: 'head-teacher',
      component: HeadTeacher,
      children: [
        // { path: 'profile', name: 'head-teacher-profile', component: HeadTeacherProfile },
        { path: 'create-member', name: 'head-teacher-create-member', component: HeadTeacherCreateMember }
      ]
    },
    {
      path: '/director/:id',
      name: 'director',
      component: Director,
      children: [
        // { path: 'profile', name: 'director-profile', component: DirectorProfile },
        { path: 'create-head-teacher', name: 'director-create-head-teacher', component: DirectorCreateHeadTeacher },
        { path: 'create-class', name: 'director-create-class', component: DirectorCreateClass }
      ]
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups
    },
    {
      path: '/group/:id',
      name: 'group',
      component: Group
    },
    {
      path: '/school/:id',
      name: 'school',
      component: School
    },
    {
      path: '/tasks_lectures',
      name: 'tasks_Lectures',
      component: TasksAndLectures
    },
    {
      path: '/task/:id',
      name: 'task',
      component: Task
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/',
      name: 'home',
      beforeEnter: function() {
        if (typeof Vue.auth.user().role === 'undefined') {
          Vue.router.push('/login'); return;
        } else {
          Vue.router.push(`/profile/${Vue.auth.user()._id}`); return;
        }
      }
    }
  ]
});
