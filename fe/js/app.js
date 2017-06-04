(function(window) {
    'use strict';

    //할 일 리스트 로드
    loadTodoList();

    //할 일 등록
    $(".new-todo").keypress(function(event) {
        if (event.keyCode == 13) {
            var todo = $(this).val();
            if (todo == "") {
                alert("내용을 입력하세요.");
            } else {
                $.ajax({
                    url: "./api/todos",
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    type: 'POST',
                    data: JSON.stringify({ "todo": todo }), //DB에서 completed 기본값 0, date 기본값 현재 시간
                    success: function(result) {
                        // alert(result.id);
                        alert("할일이 추가되었습니다.");
                        $('.todo-list').prepend("<li id='" + result.id + "'>" + '<div class="view">' + '<input class="toggle" type="checkbox">' + '<label>' + todo + '</label>' + '<button class="destroy"></button>' + '</div>' + '</li>');
                        itemLeftCount(); // 갱신
                    }

                }).error(function() {
                    alert('error');
                });
                $('.new-todo').val("");
            }
        }
    });

    //할 일 삭제하기
    //이벤트 위임 방식 
    $(document).on('click', ".destroy", function() {
        var li = $(this).closest('li');
        var li_id = li.attr('id');

        //클릭한 메모의 Id값을 구함
        $.ajax({
            url: "/api/todos/" + li_id,
            type: "DELETE",

            success: function(result) {
                alert("할일이 삭제되었습니다.");
                li.remove();
                itemLeftCount(); // 갱신
            }
        });
    });


    //완료된 일 삭제하기
    $(".clear-completed").on('click', function() {
        $.ajax({
            url: "./api/todos",
            type: "DELETE",

            success: function(data) {
                // console.log(data);

                if (data == 0) {
                    alert("완료된 일이 없습니다.");
                } else {
                    alert("완료된 일 "+data +"개가 삭제되었습니다.");
                    loadTodoList();
                    itemLeftCount();
                }


            }
        })
    })



})(window);

//할 일 리스트 로드 함수
function loadTodoList() {
    $(document).ready(function() {
        $.ajax({
            url: './api/todos',
            type: 'GET',
            dataType: 'json',
            success: function(result) {
                $(".todo-list").empty();
                var todos = [];
                // console.log(result);
                $.each(result, function(i) {
                    var checked = '';
                    var className = '';
                    // console.log(i);
                    // console.log(result[i].id);
                    if (result[i].completed == 1) {
                        className = 'class = completed';
                        check = 'checked';
                    }

                    todos.push("<li" + className + " id=" + result[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'" + checked + ">\
                               <label>" + result[i].todo + "</label><button class='destroy'></button></div></li>");

                });
                console.log(todos);
                itemLeftCount();
                // $('.todo-list').html(todos);// 왜 안되지?

                for (var i = 0; i < result.length; i++) {
                    $('.todo-list').append(todos[i]);
                }
            }
        }).error(function() {
            alert('ajax request fail');
        });
    });
}

//
function itemLeftCount() {
    $.ajax({
        url: './api/todos/count',
        type: "GET",
        success: function(result) {
            $('.todo-count strong').text(result);
        }
    })
}
// Your starting point. Enjoy the ride!
// function loadData() {

//     var $body = $('body');
//     var $wikiElem = $('#wikipedia-links');
//     var $nytHeaderElem = $('#nytimes-header');
//     var $nytElem = $('#nytimes-articles');
//     var $greeting = $('#greeting');

//     // clear out old data before new request
//     $wikiElem.text("");
//     $nytElem.text("");

//     // load streetview
//     var streetStr = $('#street').val();
//     var cityStr = $('#city').val();
//     var address = streetStr + ',' + cityStr;

//     $greeting.text('So, you want to live at ' + address + '?');

//     var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
//     $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


//     //Your NY Times AJAX request goes here
//     console.log(cityStr);
//     var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=21edf41b6db744e6ace9642213489d0f'
//     console.log(nytimesUrl);

//     $.ajax({
//             url: nytimesUrl,
//             dataType: 'json', //받는 타입
//             type: 'GET',
//             success: function(data) {
//                 $nytHeaderElem.text('New York Times Articles About ' + cityStr);
//                 console.log(data);
//                 articles = data.response.docs;
//                 for (var i = 0; i < articles.length; i++) {
//                     var article = articles[i];
//                     $nytElem.append('<li class="article">' + '<a href="' + article.web_url + '">' + article.headline.main + '</a>' + '<p>' + article.snippet + '</p>' + '</li>');
//                 }
//             }
//         }).error(function(e) {
//             $nytHeaderElem.text("New york times aricles could not be loaded");
//         })
//         // $.getJson(nytimesUrl,function(data){
//         //     $nytHeaderElem.text('New York Times Articles About ' +cityStr);
//         //     // console.log(data);
//         //     articles = data.response.docs;
//         //     for(var i=0;i<articles.length;i++){
//         //         var article=articles[i];
//         //         $nytElem.append('<li class="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+article.snippet+'</p>'+'</li>');
//         //     }
//         // });

//     var wikiRequestTimeout = setTimeout(function() {
//         $wikiElem.text('failed to get wikipedia resources');

//     }, 8000);

//     //Wikipedia Ajax request goes here
//     var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch$search=' + cityStr + '&format=json&callback=wikiCallback';
//     console.log(wikiUrl);
//     $.ajax({
//         url: wikiUrl,
//         dataType: 'jsonp',
//         type: 'GET',
//         //jsonp:''callback",
//         success: function(response) {
//             console.log(response);
//             var articleList = response[1];
//             console.log(articleList);
//             for (var i = 0; i < articleList.length; i++) {
//                 articleStr = articleList[i];
//                 var url = 'http://en.wikipedia.org/wiki/' + articleStr;
//                 console.log(url);
//                 // $wikiElem.append('<li><a href="' + url+ '">'+articleStr+<'</a></li>');
//             };
//             clearTimeout(wikiRequestTimeout);
//         }
//     });

//     // YOUR CODE GOES HERE!

//     return false;
// }

// $('#form-container').submit(loadData);
