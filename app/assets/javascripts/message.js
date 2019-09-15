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

  //  ＊自動更新

  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message').last().data('message-id')
      // $('.message:last').data("message-id");
      
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


//   var interval = setInterval(function(){
//     if (window.location.href.match(/\/groups\/\d+\/messages/)){
//       var last_message_id = $('.main__message__box').filter(":last").data('messageId')

//       $.ajax({
//         url: location.href.json,
//         data: { last_id: last_message_id },
//         type: "GET",
//         dataType: 'json'
//       })

//       .done(function(data){
//         var insertHTML = '';
//         data.forEach(function(message){
//           insertHTML = buildHTML(message);         
//           $('.main__message').append(insertHTML)
//           ScrollToNewMessage();
//         });
//       })

//       .fail(function(data){
//         alert('自動更新に失敗しました');
//       });
//     }
//   }
// });

//  ＊自動更新

// var reloadMessages = function() {
// if (window.location.href.match('/\/groups\/\d+\/messages/')){
// var last_message_id = $('.message:last').data("message-id");
// //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得

// $.ajax({
// //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
// url: "api/messages",
// //ルーティングで設定した通りhttpメソッドをgetに指定
// type: 'get',
// data: {id: last_message_id}
// dataType: 'json',
// //dataオプションでリクエストに値を含める
// })

// .done(function(messages) {
// var insertHTML = '';
// messages.forEach(function(message){
// insertHTML = buildHTML(message);
// $('.messages').append(insertHTML);
// })
// $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
// // $('form')[0].reset();
// })
// .fail(function() {
// alert('自動更新失敗');
// });
// }
// };
// setInterval(reloadMessages, 5000);
// });


// $('.message').filter(":last").data('message-id')