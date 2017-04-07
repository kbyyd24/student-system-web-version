'use strict';

let studentHTML =  students => {
  return students.map(student => {
    return `
<tr>
<td>${student.name}</td>
<td>${student.subject.math}</td>
<td>${student.subject.chinese}</td>
<td>${student.subject.english}</td>
<td>${student.subject.program}</td>
<td>${student.subject.average}</td>
<td>${student.subject.total}</td>
</tr>
`;
  }).join('');
};

let classHTML = function (classes) {
  return classes.map(clazz => {
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
    ${studentHTML(clazz.students)}
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
};

const noClassHTML = `<h3 class="text-center">没有学生信息</h3>`;

let printTable = function (classes) {
  if (classes.length !== 0) {
    const outputHTML = classHTML(classes);
    $('#classes').html(outputHTML);
  } else {
    $('#classes').html(noClassHTML);
  }
};

let loadClasses = function () {
  const allClassesUrl = '/classes';
  $.get(allClassesUrl, (classes) => {
    printTable(classes);
  });
};


loadClasses();

const search = () => {
  const query = `/score/form?stuNumbers=${$('#stuNumbers').val()}`;
  $.get(query, (data) => printTable(data));
}