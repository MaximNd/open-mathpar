import Vue from 'vue';
import Router from 'vue-router';
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
import RegisterUniversity from '../components/univesity/register/Register.vue';
import NewDean from '../components/univesity/rector/NewDean.vue';
import Rector from '../components/univesity/rector/Rector.vue';
import Dean from '../components/univesity/dean/Dean.vue';
import NewMethodist from '../components/univesity/dean/NewMethodist.vue';
import Methodist from '../components/univesity/methodist/MethodistContainer.vue';
import MethodistNewMember from '../components/univesity/methodist/createMember/CreateMemberContainer.vue';
import CreateSpecialty from '../components/univesity/dean/CreateSpecialty.vue';

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
        // { path: 'profile', name: 'student-profile', component: StudentProfile },
        { path: 'subjects', name: 'student-subjects', component: StudentSubjects },
        { path: 'gradebook', name: 'student-gradebook', component: StudentGradeBook },
      ],
    },
    {
      path: '/teacher/:id',
      name: 'teacher',
      component: Teacher,
      children: [
        // { path: 'profile', name: 'teacher-profile', component: TeacherProfile },
        { path: 'timetable_plan', name: 'teacher-timetable_plan', component: TeacherTimetableAndPlan },
        // { path: 'create-member', name: 'teacher-create-member', component: TeacherCreateMember } // TODO delete in teacher and add in headteacher
      ],
    },
    {
      path: '/head-teacher/:id',
      name: 'head-teacher',
      component: HeadTeacher,
      children: [
        // { path: 'profile', name: 'head-teacher-profile', component: HeadTeacherProfile },
        { path: 'create-member', name: 'head-teacher-create-member', component: HeadTeacherCreateMember },
      ],
    },
    {
      path: '/director/:id',
      name: 'director',
      component: Director,
      children: [
        // { path: 'profile', name: 'director-profile', component: DirectorProfile },
        { path: 'create-head-teacher', name: 'director-create-head-teacher', component: DirectorCreateHeadTeacher },
        { path: 'create-class', name: 'director-create-class', component: DirectorCreateClass },
      ],
    },
    {
      path: '/rector',
      name: 'rector',
      component: Rector,
      children: [
        { path: 'new-dean', name: 'new-dean', component: NewDean },
      ],
    },
    {
      path: '/dean',
      name: 'dean',
      component: Dean,
      children: [
        { path: 'new-methodist', name: 'new-methodist', component: NewMethodist },
        { path: 'create-specialty', name: 'create-specialty', component: CreateSpecialty },
      ],
    },
    {
      path: '/methodist',
      name: 'methodist',
      component: Methodist,
      children: [
        { path: 'new-member', name: 'new-member', component: MethodistNewMember },
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
      path: '/register/university',
      name: 'registerUniversity',
      component: RegisterUniversity,
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
