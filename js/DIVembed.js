/**
 * Created by 004928 on 2017/7/10.
 */
/**
 * 加载Html
 * @param containerId 容器id
 * @param filePath 文件路径
 * @param cb 加载完成后的回调 文件路径
 */
function loadPage (containerId , filePath , cb) {
    if(typeof window.$ === 'undefined' || window.$ == null) throw "请先引入jq";
    $.ajax({
        url: filePath ,
        type:'GET',
        dataType:'html',
        success:function (data) {
            $(containerId).html(data);
            if(cb) {cb();}
        }
    })
}