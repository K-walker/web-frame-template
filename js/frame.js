 /**
 * Created by 004928 on 2017/8/16.
 */
(function () {

    var data = [
        {
            icon:'icon-sk001',
            id:'001',
            title:'首页',
            path:'home.html',
            children:[]
        },
        {
            icon:'icon-sk002',
            title:'报表',
            id:'002',
            path:'',
            children:[
                {id:'003',icon:'',title:'岗位管理',children:[
                    {
                        icon:'icon-sk001',
                        id:'004',
                        title:'首11111页',
                        path:'page1.html',
                        children:[]
                    }
                ]},
                {id:'005',icon:'',title:'规定管理',path:'page2.html',children:[]},
                {id:'006',icon:'',title:'术语管理',path:'page3.html',children:[]},
                {id:'007',icon:'',title:'程序管理',path:'page1.html',children:[]},
                {id:'008',icon:'',title:'附件管理',path:'page2.html',children:[]},
                {id:'009',icon:'',title:'作废审批',path:'page3.html',children:[]},
                {id:'010',icon:'',title:'岗位说明书管理',path:'page1.html',children:[]}
            ]
        },
        {
            id:'011',
            icon:'icon-sk003',
            title:'数据中心管理',
            path:'',
            children:[
                {id:'012',icon:'',title:'资源管理',path:'',children:[]},
                {id:'013',icon:'',title:'角色管理',path:'',children:[]},
                {id:'014',icon:'',title:'用户管理',path:'',children:[]},
                {id:'015',icon:'',title:'组织机构',path:'',children:[]}
            ]
        },
        {
            id:'016',
            icon:'icon-sk004',
            title:'权限管理',
            path:'',
            children:[
                {id:'017',icon:'',title:'资源管理',path:'',children:[]},
                {id:'018',icon:'',title:'角色管理',path:'',children:[]},
                {id:'019',icon:'',title:'用户管理',path:'',children:[]},
                {id:'020',icon:'',title:'组织机构',path:'',children:[]}
            ]
        },
        {
            id:'021',
            icon:'icon-sk005',
            title:'基础数据维护',
            path:'',
            children:[
                {id:'022',icon:'',title:'数据字典管理',path:'',children:[]}
            ]
        },
        {
            id:'023',
            icon:'icon-sk006',
            title:'系统管理',
            path:'',
            children:[
                {id:'024',icon:'',title:'SD图管理',path:'',children:[]},
                {id:'025',icon:'',title:'SD图审核及记录',path:'',children:[]},
                {id:'026',icon:'',title:'SD图延迟预警',path:'',children:[]},
                {id:'027',icon:'',title:'SD图操作日志',path:'',children:[]}
            ]
        },
        {
            id:'028',
            icon:'icon-sk007',
            title:'监控',
            path:'',
            children:[
                {id:'029',icon:'',title:'SD图管理',path:'',children:[
                    {id:'030',icon:'',title:'SD图一',path:'',children:[]},
                    {id:'031',icon:'',title:'SD图二',path:'',children:[]},
                    {id:'032',icon:'',title:'SD图三',path:'',children:[]}
                ]},
                {id:'033',icon:'',title:'SD图审核及记录',path:'',children:[]},
                {id:'034',icon:'',title:'SD图延迟预警',path:'',children:[]},
                {id:'035',icon:'',title:'SD图操作日志',path:'',children:[]}
            ]
        }
    ];
    // 每个菜单id对应的单个数据，children.length == 0 的数据
    var idMapData = {};
    // 每个菜单id对应的孩子数据，children.length > 0 的数据
    var idChildrenData = {};
    // Tab 标签id的集合
    var tabList = [];
    // 当前点击活动的Tab
    var currTab = null ;
    // 当前活动的Page
    var currPage = null ;
    // 当前菜单是否是展开状态
    var expendMenu = true ;
    /**
     * 左侧菜单栏展开关闭事件
     */
    window.leftMenuToggleEvent = function (e) {
        toggleMenu();
        $(e.currentTarget).toggleClass('open' , '');
        // PS:这里做的是特殊处理，因为首页展示很多报表，但是要求每行展示5个，这就需要
        // 每个报表的margin根据iframe的宽高自适应，所以这里特别调用一下首页中的
        // loopExecuteByCount 方法，进行动态调整margin （！！！特殊情况才添加如此下代码）
        /*
        var home = document.getElementById("iframe001");
        if(home && !$(home).hasClass('hide')) {
            home.contentWindow.loopExecuteByCount(10 , 50);
        }
        */
    }

	// 监听鼠标滚轮事件
	$(".left").mouseenter(function () {
        if(expendMenu) {
            window._Wheel.registerWheelEvent(onScrollMenu);
        }
	});

	$(".left").mouseleave(function () {
        if(expendMenu) {
            window._Wheel.unregisterWheelEvent(onScrollMenu);
        }
	});

	/**
	 * 通过鼠标滚轮的滚动，来控制菜单的滚动
	 */
	function onScrollMenu (e) {
		e = e || window.event ;
        var distance = e.wheelDelta || e.detail ;
		distance = distance > 0 ? -50 : 50 ;
		$(".left ul.first").scrollTop($(".left ul.first").scrollTop() + distance);
	}

    /**
     * 初始化菜单
     */
    function initMenu () {
        loopCreateMenu($(".first") , data);
        $(".first li").click(onMenuItemClick);
        $(".left ul.first li").hover(onHoverInMenuItem , onHoverOutMenuItem);
        initData(data);
    }

    /**
     * 初始化数据
     */
    function initData (list) {
        for(var i = 0 ; i < list.length ; i++) {
            var obj = list[i];
            if(obj.children.length > 0) {
                idChildrenData[obj.id] = obj.children ;
                arguments.callee(obj.children);
            }
        }
    }

    /**
     * 递归创建菜单
     */
    function loopCreateMenu (parent ,  menuData) {
        for(var i = 0 ; i < menuData.length ; i ++) {
            var menu = menuData[i];
            var $menuItem = $(createMenuItem(menu));
            parent.append($menuItem);
            if(menu.children.length > 0) {
                var $childMenuBox = $("<ul class='menu hide inner-menu'></ul>");
                $menuItem.append($childMenuBox);
                arguments.callee($childMenuBox , menu.children);
            }
        }
    }

    function createMenuItem (menu) {
        if(menu.children.length == 0)  idMapData[menu.id] = menu ;
        var arrowCls = menu.children.length > 0 ? '' : 'hide';
        var pl = '';
        if(menu.icon == "") pl = "pl-48" ;
        return "<li menu-id='"+menu.id+"' class='"+pl+"'>"+
            "<div>"+
            "<i class='"+menu.icon+" menu-icon'></i>"+
            "<a>"+menu.title+"</a>"+
            "<i class='menu-arrow icon-sk027 "+arrowCls+"'></i>"+
            "</div>"+
            "</li>";
    }

    /**
     * 响应菜单项的点击事件
     */
    function onMenuItemClick (ev) {
        ev.preventDefault();ev.stopPropagation();
        if($(ev.currentTarget).has("ul").length > 0) {
            if(!expendMenu) return ;
            $(ev.currentTarget).find("ul").first().slideToggle(300);
            if(!$(ev.currentTarget).find(".menu-arrow").hasClass("hide")) {
                $(ev.currentTarget).find(".menu-arrow").toggleClass('icon-sk039','icon-sk027');
            }
        } else {
            excuteMenuEvent(ev);
        }
    }

    /**
     * 执行菜单事件
     */
    function excuteMenuEvent (ev) {
        var id = $(ev.currentTarget).attr("menu-id");
        addTab({
            id:idMapData[id].id,
            title:idMapData[id].title,
            path:idMapData[id].path
        });
		// TODO 菜单点击之后的操作

    }


    function addTab (tab) {
        if(_.indexOf(tabList , tab.id) == -1) {
            if(currTab != null) $(currTab).removeClass('open');
            $(".tab-container").width($(".tab-container").width() + 135);
            var $tab = $(createTab(tab));
            $tab.find("i").click(onTabClose);
            $tab.click(onTabClick);
            $(".tab-container").append($tab);
            tabList.push(tab.id);
            currTab = $tab[0] ;
            createTabPage(tab.id , tab.path);
        }
    }

    function createTab (tab) {
        var tab = "<div class='tab open' tab-id='"+tab.id+"'>"+
            "<span>"+tab.title+"</span>"+
            "<i class='icon-sk021 tab-close'></i>"+
            "</div>" ;
        return tab ;
    }

    /**
     * 创建新的页面
     * @param path
     */
    function createTabPage (id , path) {
        var page = $("<iframe class='myframe' id='iframe"+id+"' name='iframe' border='0' frameborder='0' src='"+path+"'></iframe>");
        if(currPage != null) {
            currPage.addClass('hide');
        }
        $(".container").append(page);
        page.removeClass('hide');
        currPage = page ;
    }

    /**
     * 响应Tab的点击事件
     * @param e
     */
    function onTabClick (e) {
        if(e.currentTarget != currTab) {
            $(e.currentTarget).addClass("open");
            $(currTab).removeClass('open');
            currTab = e.currentTarget ;
            var id = $(e.currentTarget).attr("tab-id");
            switchPage(id);
        }
    }

    /**
     * 根据id切换界面
     * @param id
     */
    function switchPage (id) {
        currPage.addClass('hide');
        currPage = $("#iframe"+id).removeClass('hide');
    }

    /**
     * 关闭页面
     * @param id
     * @param tab
     */
    function closePage (id , tab) {
        $(tab).closest(".tab").remove();
        $("#iframe"+id).remove();
    }

    /**
     * 关闭tab
     * 当前页面被关闭：
     *  1.默认显示左边第一个Tab
     *      如果没有，则显示右边第一个，否则走步骤2；
     *  2.没有其他界面，则显示空白
     */
    function onTabClose (e) {
        e.preventDefault(); e.stopPropagation();
        var id = $(e.currentTarget).closest(".tab").attr("tab-id");
        var index = _.indexOf(tabList , id);
        if(index != -1) tabList.splice(index , 1);
        $(".tab-container").width($(".tab-container").width() - 135);
        var nextTab = $(e.currentTarget).closest(".tab").prev();
        if(nextTab.length == 0) {
            nextTab = $(e.currentTarget).closest(".tab").next();
        }

        // 当前只有一个被打开的页面
        if(nextTab.length == 0) {
            closePage(id , e.currentTarget);
            return ;
        }
        closePage(id , e.currentTarget);
        nextTab.trigger("click");
    }

    /**
     * 展开/关闭菜单
     */
    function toggleMenu () {
        toggleLeftMenu();
        toggleTopBar();
        reSetContainerSize();
    }

    /**
     * 展开/收缩左侧菜单
     */
    function toggleLeftMenu () {
        expendMenu = !expendMenu ;
        $(".left").toggleClass('slide-left-out' , '');
        $(".inner-menu").slideUp();
    }
    /**
     * 展开/收缩顶部导航
     */
    function toggleTopBar () {
        $(".top").toggleClass('slide-top-out' ,'');
    }
    /**
     * 重置内容区域宽高
     */
    function reSetContainerSize () {
        $(".container").toggleClass('zoom-container' ,'');
    }

    /**
     * 上一页
     */
    function onPrePage () {
        $(".tab-scroll").scrollLeft($(".tab-scroll").scrollLeft() - 135);
    }

    /**
     * 下一页
     */
    function onNextPage () {
        $(".tab-scroll").scrollLeft($(".tab-scroll").scrollLeft() + 135);
    }

    function onHoverInMenuItem (ev) {
        ev.preventDefault();ev.stopPropagation();
        var menuId = $(ev.currentTarget).attr("menu-id") ;
        var floatMenu = document.getElementById("f"+menuId);
        if(!expendMenu && floatMenu == null) {
            if(idChildrenData[menuId]) {
                createFloatMenu(ev.currentTarget ,  menuId);
            }
        }
    }

    function onHoverOutMenuItem (ev) {
        var menuId = $(ev.currentTarget).attr("menu-id") ;
        var floatMenu = document.getElementById("f"+menuId);
        if(!expendMenu) {
            if(floatMenu != null) {
                $(floatMenu).fadeOut(function () {
                    $(floatMenu).remove();
                })
            }
        }
    }

    /**
     * 创建悬浮菜单
     */
    function createFloatMenu (target , menuId) {
        var menuData = idChildrenData[menuId];
        var $floatMenu = $("<div class='float-menu hide' id='f"+menuId+"'></div>");
        $floatMenu.append("<div class='float-arrow'></div><ul></ul>");
        for(var i = 0 ; i < menuData.length ; i ++) {
            var menu = menuData[i];
            var $menuItem = $(createFloatMenuItem(menu));
            $menuItem.hover(onHoverInMenuItem , onHoverOutMenuItem);
            $menuItem.click(onFloatMenuItemClick);
            $floatMenu.find("ul").append($menuItem);
        }
        $(target).append($floatMenu);
        setFloatMenuPosition(target , $floatMenu);
    }

    /**
     * 设置悬浮菜单的位置
     * 如果下级菜单的高度大于上级菜单的top值，则底部对其
     * 在菜单显示之前是无法获取高度的，所以这里用菜单的固定高度*菜单的数量来计算
     */
    function setFloatMenuPosition (target , $floatMenu) {
        var offset = $(target).offset();
        offset.left += target.clientWidth;
        var floatMenuHeight = $floatMenu.find("ul").first().children().length * 50 ;
        if($("body").height() - offset.top < floatMenuHeight) {
            offset.top -= (floatMenuHeight - 50);
            var arrowOffset = $(".float-arrow").offset() ;
            arrowOffset.top += (floatMenuHeight - 50);
            $(".float-arrow").offset(arrowOffset);
        }
        $floatMenu.offset(offset);
        $floatMenu.fadeIn();
    }

    /**
     * 创建悬浮菜单项
     */
    function createFloatMenuItem (obj) {
        var arrCls = obj.children.length > 0 ? "icon-sk027":"icon-sk027 hide";
        return "<li menu-id='"+obj.id+"'><a>"+obj.title+"</a><i class='"+arrCls+"'></i></li>";
    }

    /**
     * 浮动菜单的点击事件
     */
    function onFloatMenuItemClick (e) {
        e.preventDefault();e.stopPropagation();
        var menuId = $(e.currentTarget).attr("menu-id");
        if(!idChildrenData[menuId]) {
            excuteMenuEvent(e);
            $(".float-menu").remove();
        }
    }

    $(".tab-pre").click(onPrePage);
    $(".tab-next").click(onNextPage);

    initMenu();
    // 如需框架默认加载首页，则取消下面注释的代码
    //$(".left ul.first li").first().trigger("click");
})()