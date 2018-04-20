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
import SchoolLearningStuff from '../components/schoolLearningStuff/SchoolLearningStuffContainer.vue';
import Task from '../components/schoolLearningStuff/tasks/task/TaskContainer.vue';
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
      path: '/app/profile/:id',
      name: 'profile',
      component: Profile
    },
    {
      path: '/app/student/:id',
      name: 'student',
      component: Student,
      children: [
        // { path: 'profile', name: 'student-profile', component: StudentProfile },
        { path: 'subjects', name: 'student-subjects', component: StudentSubjects },
        { path: 'gradebook', name: 'student-gradebook', component: StudentGradeBook }
      ]
    },
    {
      path: '/app/teacher/:id',
      name: 'teacher',
      component: Teacher,
      children: [
        // { path: 'profile', name: 'teacher-profile', component: TeacherProfile },
        { path: 'timetable_plan', name: 'teacher-timetable_plan', component: TeacherTimetableAndPlan }
        // { path: 'create-member', name: 'teacher-create-member', component: TeacherCreateMember } // TODO delete in teacher and add in headteacher
      ]
    },
    {
      path: '/app/head-teacher/:id',
      name: 'head-teacher',
      component: HeadTeacher,
      children: [
        // { path: 'profile', name: 'head-teacher-profile', component: HeadTeacherProfile },
        { path: 'create-member', name: 'head-teacher-create-member', component: HeadTeacherCreateMember }
      ]
    },
    {
      path: '/app/director/:id',
      name: 'director',
      component: Director,
      children: [
        // { path: 'profile', name: 'director-profile', component: DirectorProfile },
        { path: 'create-head-teacher', name: 'director-create-head-teacher', component: DirectorCreateHeadTeacher },
        { path: 'create-class', name: 'director-create-class', component: DirectorCreateClass }
      ]
    },
    {
      path: '/app/groups',
      name: 'groups',
      component: Groups
    },
    {
      path: '/app/group/:id',
      name: 'group',
      component: Group
    },
    {
      path: '/app/school/:id',
      name: 'school',
      component: School
    },
    {
      path: '/app/school_learning_stuff',
      name: 'school_learning_stuff',
      component: SchoolLearningStuff
    },
    {
      path: '/app/task/:id',
      name: 'task',
      component: Task
    },
    {
      path: '/app/login',
      name: 'login',
      component: Login
    },
    {
      path: '/app/register',
      name: 'register',
      component: Register
    },
    {
      path: '/app',
      name: 'home',
      beforeEnter: function() {
        if (typeof Vue.auth.user().role === 'undefined') {
          Vue.router.push('/app/login'); return;
        } else {
          Vue.router.push(`/app/profile/${Vue.auth.user()._id}`); return;
        }
      }
    }
  ]
});
