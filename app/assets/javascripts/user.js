$(function(){

  var user_list = $("#user-search-result");

function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
               <p class="chat-group-user__name">${user.name}</p>
               <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
             </div>`
  
  user_list.append(html);
}

$('#user-search-field').on('keyup', function(e){
  e.preventDefault();
  var input = $('.chat-group-form__input').val();

  $.ajax({
    url: '/users',
    type: "GET",
    data: { keyword: input },
    dataType: 'json',
  })

  .done(function(users) {
    if (users.length !== 0) {
      users.forEach(function(user){
        appendUser(user);
      });
    }
  })

  // .fail(function(){
  //   alert('error');
  // });
  //   return false;
  // });

 });

});
