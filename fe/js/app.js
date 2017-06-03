(function(window) {
    'use strict';

    //할 일 리스트 로드
    loadPage();

    
    //할 일 추가
    $(".new-todo").keypress(function(event) {
        if (event.which == 13) {
            var todo = $(this).val();
            if (todo == "") {
                alert("문자를 입력하세요.(빈문자X)");
            } else {
                $.ajax({
                    url: "./api/todos",
                    dataType: "json",
                    contentType: "application/json; charset=UTF-8",
                    type: 'POST',
                    data: JSON.stringify({"todo": todo}), //DB에서 completed 기본값 0, date 기본값 현재 시간

                    success: function(result) {
                        alert(result.id);
                        alert("할일이 추가되었습니다.");
                        
                        $('.todo-list').prepend("<li id='" + result.id + "'>" + '<div class="view">' + '<input class="toggle" type="checkbox">' + '<label>' + todo + '</label>' + '<button class="destroy"></button>' + '</div>' + '</li>');
                    }
                }).error(function() {
                    alert('error');
                });

                $('.new-todo').val("");
            }

        }

    });

})(window);


function loadPage(){
    $(document).ready(function() {
        $.ajax({
            url: './api/todos',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var todos = [];
                var itemleftCount = 0;
                console.log(data);
                $.each(data, function(i) {
                    var checked = '';
                    var className = '';
                    console.log(i);
                    console.log(data[i].id);

                    if (data[i].completed == 1) {
                        className = 'completed';
                        check = 'checked';
                    } else {
                        itemleftCount++;
                    }
                    todos.push("<li class=" + className + "id=" + data[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'" + checked + ">\
                               <label>" + data[i].todo + "</label><button class='destroy'></button></div></li>");

                });
                 // $('.todo-list').html(todos);// 왜 안되지?

                for (var i = 0; i < data.length; i++) {
                    $('.todo-list').append(todos[i]);  
                }
                $('.todo-count > strong').text(itemleftCount);
            }
        }).error(function(){
            alert('ajax request fail');
        });
    });
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
