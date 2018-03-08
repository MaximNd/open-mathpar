import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const state = {
    user: undefined
};

const getters = {
    user(state) {
        return state.user;
    },
    userTableData(state) {
        if (typeof state.user === 'undefined') return {};
        let user = [
            { title: 'Full name', text: state.user.fullName },
            { title: 'Gender', text: state.user.gender },

            { title: 'Role', text: state.user.role.map(role => `${role.charAt(0).toUpperCase()}${role.substring(1, role.length)}`).join(', ') },
            { title: 'Email', text: state.user.email },
            // { title: 'AVG SR Mark', text: '50 | 50 | 1 | 2' },
            // { title: 'AVG KR Mark', text: '70' },
            // { title: 'AVG SR Dispersion', text: '10 | 12 | 1 | 1' },
            // { title: 'AVG KR Dispersion', text: '12' },
            { title: 'Birthday', text: new Date(state.user.birthday).toDateString() },
            { title: 'Age', text: state.user.age }
            // { title: 'School', text: 'School' },
            // { title: 'Group', text: 'Group' },
            // { title: 'Subjects', text: 'Subjects' }
        ];
        return user;
    },
    clientsTableData(state) {
        if (typeof state.user === 'undefined') return {};
        let res = [];
        state.user.clients.forEach(client => {
            if (client.clientRole === 'director' || client.clientRole === 'headTeacher') {
                res.push({ title: 'School', text: client.client.schoolId.name });
            } else if (client.clientRole === 'teacher') {
                res.push({ title: 'Subjects',
                        text: client.client.timetable.map(lesson => lesson.subjectId.name).filter((subject, index, subjects) => subjects.indexOf(subject) === index).join(', ') });
            } else if (client.clientRole === 'student') {
                res.push({ title: 'AVG SR Mark', text: `${client.client.avgMarks.avgAllSR.avgAll.firstNumber} | ${client.client.avgMarks.avgAllSR.avgAll.secondNumber} | ${client.client.avgMarks.avgAllSR.avgAll.thirdNumber} | ${client.client.avgMarks.avgAllSR.avgAll.fourthNumber}` });
                res.push({ title: 'AVG KR Mark', text: client.client.avgMarks.avgAllKR == null ? 'No data yet' : client.client.avgMarks.avgAllKR });
                res.push({ title: 'AVG SR Dispersion', text: `${client.client.avgDispercion.allSr.firstNumber || 'No data yet'} | ${client.client.avgDispercion.allSr.secondNumber || 'No data yet'} | ${client.client.avgDispercion.allSr.thirdNumber || 'No data yet'} | ${client.client.avgDispercion.allSr.fourthNumber || 'No data yet'}` });
                res.push({ title: 'AVG KR Dispersion', text: client.client.avgDispercion.allKr == null ? 'No data yet' : client.client.avgDispercion.allKr });
                res.push({ title: 'School', text: client.client.schoolId.name });
            }
        });
        return res;
    }
};

const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    }
};

const actions = {
    getUser({ commit }, payload) {
        console.log(payload.params.id);
        console.log(Vue.auth.user());
        return new Promise((resolve, reject) => {
            if (payload.params.id === Vue.auth.user().id) {
                commit('SET_USER', Vue.auth.user());
                resolve();
            } else {
                // need watch by id in components to redirect
                Vue.http.get(`user/${payload.params.id}`)
                    .then(data => {
                        let user = data.body.user;
                        let clients = data.body.clients;
                        user.clients = clients;
                        console.log(user);
                        commit('SET_USER', user);
                        resolve();
                    })
                    .catch(err => reject(err));
            }
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
