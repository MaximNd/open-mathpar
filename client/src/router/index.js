import Vue from 'vue';
import Router from 'vue-router';
import Student from '../components/student/StudentContainer.vue';
import Profile from '../components/profile/ProfileContainer.vue';
import StudentSubjects from '../components/student/studentSubjects/StudentSubjectsContainer.vue';
import StudentGradeBook from '../components/student/studentGradebook/StudentGradebookContainer.vue';
import Groups from '../components/groups/GroupsContainer.vue';
import Group from '../components/groups/GroupContainer.vue';
import School from '../components/school/SchoolContainer.vue';
import Teacher from '../components/teachers/TeacherContainer.vue';
import TeacherTimetableAndPlan from '../components/teachers/TeacherTimetableAndPlan/TeacherTimetableAndPlanContainer.vue';
import SchoolLearningStuff from '../components/schoolLearningStuff/SchoolLearningStuffContainer.vue';
import Task from '../components/schoolLearningStuff/tasks/task/TaskContainer.vue';
import TaskReview from '../components/schoolLearningStuff/tasks/task/TaskReviewContainer.vue';
import HeadTeacher from '../components/head-teachers/HeadTeacherContainer.vue';
import HeadTeacherCreateMember from '../components/head-teachers/createMember/CreateMemberContainer.vue';
import Director from '../components/director/DirectorContainer.vue';
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
      component: Profile,
    },
    {
      path: '/student/:id',
      name: 'student',
      component: Student,
      children: [
        { path: 'subjects', name: 'student-subjects', component: StudentSubjects },
        { path: 'gradebook', name: 'student-gradebook', component: StudentGradeBook },
      ],
    },
    {
      path: '/teacher/:id',
      name: 'teacher',
      component: Teacher,
      children: [
        { path: 'timetable_plan', name: 'teacher-timetable_plan', component: TeacherTimetableAndPlan },
      ],
    },
    {
      path: '/head-teacher/:id',
      name: 'head-teacher',
      component: HeadTeacher,
      children: [
        { path: 'create-member', name: 'head-teacher-create-member', component: HeadTeacherCreateMember },
      ],
    },
    {
      path: '/director/:id',
      name: 'director',
      component: Director,
      children: [
        { path: 'create-head-teacher', name: 'director-create-head-teacher', component: DirectorCreateHeadTeacher },
        { path: 'create-class', name: 'director-create-class', component: DirectorCreateClass },
      ],
    },
    {
      path: '/groups',
      name: 'groups',
      component: Groups,
    },
    {
      path: '/group/:id',
      name: 'group',
      component: Group,
    },
    {
      path: '/school/:id',
      name: 'school',
      component: School,
    },
    {
      path: '/school_learning_stuff',
      name: 'school_learning_stuff',
      component: SchoolLearningStuff,
    },
    {
      path: '/task/:id',
      name: 'task',
      component: Task,
    },
    {
      path: '/task-review/:id',
      name: 'task-review',
      component: TaskReview
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '',
      name: 'home',
      beforeEnter() {
        if (typeof Vue.auth.user().role === 'undefined') {
          Vue.router.push('/login');
        } else {
          Vue.router.push(`/profile/${Vue.auth.user()._id}`);
        }
      },
    },
  ],
});
