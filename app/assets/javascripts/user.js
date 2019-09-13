$(function(){

  var user_list = $("#user-search-result");

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
              </div>`
  
    user_list.append(html);
  }

  function appendNoUser(nouser) {
    var html = `<li>
                  <div class='chat-group-user__name'>${ nouser }</div>
                </li>`
    user_list.append(html);
  }

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();
    $("#user-search-result").empty();
    var input = $('#user-search-field').val();
    if (input == ""){
      return
    }

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
      else {
        appendNoUser("だれもいません");
      }
    })

    .fail(function(){
      alert('エラーです')
    })
  });
    
  var user_list_add = $("#chat-group-users");

  function appendMembers(user_name, user_id) {
    var html =`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    user_list_add.append(html);
  }

  $(document).on('click', '.user-search-add', function() {
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    appendMembers(name, user_id);
    $(this).parent().remove();
  });

  $(document).on("click", '.user-search-remove', function() {
    $(this).parent().remove();
  });
  
});
