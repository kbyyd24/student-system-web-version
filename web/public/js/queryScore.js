'use strict';

// import $ from 'jquery.min';

const allClassesUrl = '/classes';

const formatStudents = students => {
  return students.map(student => {
    return `
<tr>
<td>${student.name}</td>
<td>${student.subject.math}</td>
<td>${student.subject.chinese}</td>
<td>${student.subject.english}</td>
<td>${student.subject.program}</td>
<td>${student.subject.calAverage()}</td>
<td>${student.subject.calTotal()}</td>
</tr>
    `;
  }).join('');
};

$.get(allClassesUrl, (classes) => {
  const outputHTML = classes.map(clazz => {
    return `
<div>班级: <span>${clazz.classNumber}</span></div>
<div>
  <table class="table">
    <tr>
      <th>姓名</th>
      <th>数学成绩</th>
      <th>语文成绩</th>
      <th>英语成绩</th>
      <th>编程成绩</th>
      <th>平均分</th>
      <th>总分</th>
    </tr>
    ${formatStudents(clazz.students)}
  </table>
</div>
<div>
  <table class="table">
    <tr>
      <th>班级总分平均分</th>
      <th>班级总分中位数</th>
    </tr>
    <tr>
      <td>${clazz.average}</td>
      <td>${clazz.median}</td>
    </tr>
  </table>
</div>`;
  }).join('');
  $('#classes').html(outputHTML);
});