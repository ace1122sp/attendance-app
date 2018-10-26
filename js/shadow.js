(() => {
  const model = {
    init: () => {
      if (!localStorage.getItem('students') && !localStorage.getItem('totalDays')) {
        const STUDENTS = ['Slappy the Frog', 'Lilly the Lizard', 'Paulrus the Warlrus', 'Gregory the Goat', 'Adam the Anaconda'];
        const TOTAL_DAYS = 12;
        const attendanceTemplate = [];
        const students = {};

        for (let i = 0; i < 12; i++) {
          attendanceTemplate.push(false);
        }

        STUDENTS.forEach(student => {
          students[student] = [...attendanceTemplate];
        });

        // store initial students data
        localStorage.setItem('students', JSON.stringify(students));
        localStorage.setItem('totalDays', TOTAL_DAYS);
      }
    },
    getTotalDays: () => localStorage.getItem('totalDays'),
    getAllStudents: () => JSON.parse(localStorage.getItem('students')),
    getStudent: function (studentName) {
      const allStudents = this.getAllStudents();
      return allStudents[studentName];
    },
    modifyAttendance: function(student, day) {
      const allStudents = this.getAllStudents();
      allStudents[student][day] = !allStudents[student][day];
    },

  };

  const view = {
    init: function () {

      // get data
      const TOTAL_DAYS = octopus.getTotalDays();
      const students = octopus.getAllStudents(); // to be written
      const studentNames = Object.keys(students);
      
      // get dom
      this.thead = document.getElementsByTagName('thead')[0];
      const tableHeadRow = document.createElement('tr');

      // create and populate table headers
      const tableHeadings = [];
      for (let i = 1; i <= TOTAL_DAYS; i++) {
        tableHeadings.push(i);
      }
      tableHeadings.unshift('Student Name');
      tableHeadings.push('Days Missed');
      
      tableHeadings.forEach(element => {
        let th = document.createElement('th');
        th.innerText = element;
        tableHeadRow.appendChild(th);
      });

      // create and populate table body rows


      // update dom
      this.thead.appendChild(tableHeadRow);
    }
  };

  const octopus = {
    init: () => {
      model.init();
      view.init();
    },
    getAllStudents: () => model.getAllStudents(),
    getTotalDays: () => model.getTotalDays()
  };

  octopus.init();
})();