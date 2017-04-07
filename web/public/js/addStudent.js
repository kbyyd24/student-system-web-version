'use strict';

const newStudentUrl = '/student/new';
const addStudent = () => {
  const studentForm = [...$('input')]
    .map(element => {
      let item = {};
      let value = element.value;
      item[element.name] = value;
      element.value = '';
      return item;
    })
    .reduce((acc, next) => Object.assign(acc, next), {});
  $.post(newStudentUrl, studentForm, (data) => {
    $('#msg span:first-child').text(data.msg);
  });
}