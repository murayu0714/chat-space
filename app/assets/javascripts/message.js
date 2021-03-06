$(function(){

  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var image = message.image ? `<img src= ${ message.image }>`: "";

    var html =
      `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
          <div class="lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
              ${image}
          </div>
      </div>`
      return html;
  }

  // *非同期通信

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form')[0].reset();
    })

    .fail(function(){
      alert('error');
    })

    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  });
  
  //  自動更新

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('message-id')
      
      $.ajax({
        url: "api/messages",
        data: {id: last_message_id },
        type: "GET",
        dataType: 'json'
      })

      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);         
          $('.messages').append(insertHTML)
        })
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast'); 
      })

      .fail(function(){
        alert('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});