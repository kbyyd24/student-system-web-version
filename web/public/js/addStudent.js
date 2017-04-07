'use strict';

const addStudent = () => {
  const newStudentUrl = '/student/new';
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
    $('#msg').find('span:first-child').text(data.msg);
  });
}