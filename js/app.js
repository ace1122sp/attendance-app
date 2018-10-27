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

    getStudentDaysMissed: function(studentName) {
      const allStudents = this.getAllStudents();
      const totalDays = this.getTotalDays();
      const _dayReducer = (acc, currentDay) => {
        if (currentDay) return acc - 1;
        return acc;
      }
      const missedDays = allStudents[studentName].reduce(_dayReducer, totalDays);
      
      return missedDays;
    },

    modifyAttendance: function(studentName, day, attendance) {
      const allStudents = this.getAllStudents();

      allStudents[studentName][day] = attendance;
      localStorage.setItem('students', JSON.stringify(allStudents));
    },

  };

  const view = {
    _initializeTableHeaders: function () {
      const tableHeadings = [];
      
      for (let i = 1; i <= this.TOTAL_DAYS; i++) {
        tableHeadings.push(i);
      }
      tableHeadings.unshift('Student Name');
      tableHeadings.push('Days Missed');

      tableHeadings.forEach(element => {
        let th = document.createElement('th');
        th.innerText = element;
        this.tableHeadRow.appendChild(th);
      });
    },

    _initializeTableBody: function() {
      this.studentNames.forEach(name => {
        let tr = document.createElement('tr');
        let tdName = document.createElement('td');

        tdName.innerText = name;
        tr.appendChild(tdName);

        for (let i = 0; i < this.TOTAL_DAYS; i++) {
          let td = document.createElement('td');
          let checkbox = document.createElement('input');

          checkbox.setAttribute('type', 'checkbox');
          if (this.students[name][i]) checkbox.setAttribute('checked', '');

          // add event listeners
          checkbox.addEventListener('change', function () {
            octopus.modifyAttendance(name, i, this.checked);
          });

          // append to parent element
          td.appendChild(checkbox);
          tr.appendChild(td);
        }

        let tdMissingDays = document.createElement('td');

        tdMissingDays.setAttribute('id', `${name}-days-missed`);
        tdMissingDays.innerText = octopus.getStudentDaysMissed(name);

        tr.appendChild(tdMissingDays);
        this.tbody.appendChild(tr);
      });
    },

    init: function () {
      
      // get data
      this.TOTAL_DAYS = octopus.getTotalDays();
      this.students = octopus.getAllStudents();
      this.studentNames = Object.keys(this.students);
      
      // get dom
      this.thead = document.getElementsByTagName('thead')[0];      
      this.tableHeadRow = document.createElement('tr');
      this.tbody = document.getElementsByTagName('tbody')[0];

      // create and populate table headers
      this._initializeTableHeaders();
      
      // create and populate table body rows
      this._initializeTableBody();

      // update dom
      this.thead.appendChild(this.tableHeadRow);
    },

    render: function (studentName, totalDaysMissed) {
      const id = `${studentName}-days-missed`;
      const td = document.getElementById(id);

      td.innerText = totalDaysMissed;
    }
  };

  const octopus = {
    init: () => {
      model.init();
      view.init();
    },

    getAllStudents: () => model.getAllStudents(),

    getTotalDays: () => model.getTotalDays(),

    getStudentDaysMissed: (studentName) => model.getStudentDaysMissed(studentName),

    modifyAttendance: function (studentName, day, attendance) {
      model.modifyAttendance(studentName, day, attendance);
      const daysMissed = this.getStudentDaysMissed(studentName);

      view.render(studentName, daysMissed);
    }
  };

  octopus.init();
})();