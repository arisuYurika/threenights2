//=============================================================================
// Drill_GaugeForVariable.js
//=============================================================================

/*:
 * @plugindesc [v2.0]        UI - 高级变量固定框
 * @author Drill_up
 * 
 * @Drill_LE_param "固定框样式-%d"
 * @Drill_LE_parentKey ""
 * @Drill_LE_var "DrillUp.g_GFV_styleList_length"
 * 
 * @Drill_LE_param "变量框设置-%d"
 * @Drill_LE_parentKey "---变量框设置%d至%d---"
 * @Drill_LE_var "DrillUp.g_GFV_bind_length"
 * 
 * 
 * @help
 * =============================================================================
 * +++ Drill_GaugeForVariable +++
 * 作者：Drill_up
 * 如果你有兴趣，也可以来看看更多我写的drill插件哦ヽ(*。>Д<)o゜
 * https://rpg.blue/thread-409713-1-1.html
 * =============================================================================
 * 能在地图界面或战斗界面显示多个不同的变量参数框。
 * 注意，该框功能是实现 变量值 可视化而存在的，一切都是基于变量值而显示的。
 * 【支持插件关联资源的打包、加密】
 * 
 * -----------------------------------------------------------------------------
 * ----插件扩展
 * 插件需要基于核心，可以与其它插件组合。
 * 基于：
 *   - Drill_CoreOfBallistics       系统 - 弹道核心
 *   - Drill_CoreOfGaugeMeter       系统 - 参数条核心
 *   - Drill_CoreOfGaugeNumber      系统 - 参数数字核心
 *     必须要有上述核心，才能配置完整的boss框。
 *
 * -----------------------------------------------------------------------------
 * ----设定注意事项
 * 1.插件的作用域：地图界面、战斗界面
 *   放置在 战斗上层 或 地图图片层。
 * 2.更多内容可以去看看文档 "13.UI > 关于高级变量固定框.docx"。
 *   其中也有变量框"从零开始设计"的教程。
 * 细节：
 *   (1.变量固定框样式 = n个槽样式 + 2个外框；
 *      槽样式 = 1个参数条 + 1个参数数字 + 1个名称。
 *   (2.战斗界面中，变量框放在战斗层级的 上层 。
 *      地图界面中，变量框放在地图层级的 图片层 。
 *      你需要考虑规划 变量框 与 其他贴图 的先后顺序与位置。
 *   (3.注意，该框功能是实现 变量值 可视化而存在的，
 *      一切都是基于变量值而显示的。
 * 样式槽：
 *   (1.你可以在一个固定框样式里面，添加多个样式槽。
 *      每个槽都可以配置 1个参数条、1个参数数字、1个名称。
 *      比如你要显示4种资源，那么配置4个槽即可。
 * 参数条：
 *   (1.参数值：　可绑定变量或物品数量。
 *      遮罩：　　可自定义。
 *      旋转：　　可自定义。
 *      段上限：　可自定义，可多段。可插件指令修改值。
 *      流动效果：可自定义。
 *      凹槽条：　可自定义。
 *      弹出条：　可自定义。
 *      粒子：　　可自定义。
 *      游标：　　可自定义。
 *      加满动画：可自定义。
 *   (2.参数条样式配置在 参数条核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 *      你需要先配置参数条样式，才能将样式id对应到指定的 槽样式 中。
 *   (3.如果你有不同想法，参数条可以设置多段、游标、凹槽条 等。
 * 参数数字：
 *   (1.参数值：　可绑定变量或物品数量。
 *      旋转：　　可自定义。
 *      滚动效果：可自定义。
 *      符号：　　可自定义。
 *      前缀后缀：可自定义。
 *      对齐方式：可自定义。
 *      额定值：　可自定义，可插件指令修改值。
 *      额定符号：可自定义。
 *      时间格式：可自定义。
 *   (2.参数数字样式配置在 参数数字核心 中配置。
 *      部分特定的属性需要在该插件中扩展修改。
 *      你需要先配置参数数字样式，才能将样式id对应到指定的 槽样式 中。
 *   (3."x19"或"+100/100"等数字组合写法，都在核心中配置样式，该插件只
 *      关联样式id。
 * 注意事项：
 *   (1.注意，框的名称不能支持特殊字符，也不能支持高级颜色。
 *   (2.该插件配置有 固定框样式 和 变量框设置。
 *      找不到配置的时候，记得 往下翻 参数列表，因为变量框设置在下面。
 * 存储数据：
 *   (1.插件中很多属性修改后永久有效，这些数据存入了存档中，
 *      如果读取旧存档，会出现旧存档中部分数据不一致的问题。
 *   (2.插件支持 空数据同步更新 的优化，
 *      详细去看看"0.基本定义 > 数据更新与旧存档.docx"
 * 设计：
 *   (1.一个固定框样式可以只放 参数数字 ，用于计分板、资源表、参数表等。
 *      也可以只放 参数条，用于剩余时间条、任务进度条、大招槽、能源条等。
 * 旧版本：
 *   (1.由于底层进行了全面翻新，当前版本与 1.6及1.6以前版本 已经完全不同，
 *      旧版本配置的数据在新版本中不兼容。
 *
 * -----------------------------------------------------------------------------
 * ----关联文件
 * 资源路径：img/Special__variable （Special后面有两个下划线）
 * 先确保项目img文件夹下是否有Special__variable文件夹。
 * 要查看所有关联资源文件的插件，可以去看看"插件清单.xlsx"。
 * 如果没有，需要自己建立。需要配置资源文件：
 * 
 * 样式1 资源-固定框背景 （img/Special__variable）
 * 样式1 资源-固定框前景 （img/Special__variable）
 * 样式2 ……
 * ……
 * 
 * 变量框样式本体设置的资源不多，但是参数条和参数数字的资源非常多，你需
 * 要仔细给你的文件分门别类。
 *
 * -----------------------------------------------------------------------------
 * ----可选设定 - 框设置
 * 你可以通过插件指令修改框设置：
 * （冒号左右都有一个空格）
 * 
 * 插件指令：>高级变量框 : 框设置[1] : 隐藏
 * 插件指令：>高级变量框 : 框设置[1,2,3] : 隐藏
 * 插件指令：>高级变量框 : 全部框设置 : 隐藏
 * 
 * 插件指令：>高级变量框 : 框设置[1] : 隐藏
 * 插件指令：>高级变量框 : 框设置[1] : 显示
 * 插件指令：>高级变量框 : 框设置[1] : 修改位置[100,100]
 * 插件指令：>高级变量框 : 框设置[1] : 修改位置(变量)[21,22]
 * 
 * 1.插件指令的 前半部分（框设置）和后半部分（隐藏）的参数可以随意组合。
 *   一共有3*2种组合方式。
 * 2."框设置"对应你在插件中配置的 变量框设置 的id。
 *   框隐藏/显示指令执行后，不会立刻消失，而是播放移动动画后消失。
 * 
 * -----------------------------------------------------------------------------
 * ----可选设定 - 槽设置
 * 你可以通过插件指令修改框设置中的指定槽的数据：
 * （冒号左右都有一个空格）
 * 
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 显示名称
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 隐藏名称
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 显示参数数字
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 隐藏参数数字
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 修改名称[蔬菜]
 * 
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 修改段上限[300]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 添加段上限[+100]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 变量修改段上限[21]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 变量添加段上限[21]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 修改额定值[300]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 添加额定值[+100]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 变量修改额定值[21]
 * 插件指令：>高级变量框 : 框设置[1] : 槽[1] : 变量添加额定值[21]
 * 
 * 1.每个槽数据都对应1个参数条、1个参数数字、1个名称，你可以通过插件指令
 *   控制槽中的数据。
 * 2.注意，插件指令里面，修改的名字不能出现 空格 和 英文冒号。
 *   修改后参数永久有效。
 * 3."修改段上限[300]"可以使得段上限的值设置为300，
 *   "变量修改段上限[21]"可以使得段上限的值设置为 变量21 的值。
 *   "添加段上限[+100]"表示在其基础上添加值，如果为[-100]，则表示减去。
 *   "变量添加段上限[21]"表示在其基础上添加变量的值（变量可以为负数值）。
 * 4.额定值是 参数数字 的属性，修改额定值后，显示的数字会改变。
 *   段上限是 参数条 的属性，修改段上限后，参数条的百分比例会改变。
 * 
 * -----------------------------------------------------------------------------
 * ----插件性能
 * 测试仪器：   4G 内存，Intel Core i5-2520M CPU 2.5GHz 处理器
 *              Intel(R) HD Graphics 3000 集显 的垃圾笔记本
 *              (笔记本的3dmark综合分：571，鲁大师综合分：48456)
 * 总时段：     20000.00ms左右
 * 对照表：     0.00ms  - 40.00ms （几乎无消耗）
 *              40.00ms - 80.00ms （低消耗）
 *              80.00ms - 120.00ms（中消耗）
 *              120.00ms以上      （高消耗）
 * 工作类型：   持续执行
 * 时间复杂度： o(样式槽数)*o(n^3)*o(贴图处理)
 * 测试方法：   在各个界面中以正常游戏流程进行测试。
 * 测试结果：   地图界面，消耗为：【31.74ms】
 *              战斗界面，消耗为：【30.04ms】
 *
 * 1.插件只在自己作用域下工作消耗性能，在其它作用域下是不工作的。
 *   测试结果并不是精确值，范围在给定值的10ms范围内波动。
 *   更多性能介绍，去看看 "0.性能测试报告 > 关于插件性能.docx"。
 * 2.开了持续变化的参数条与参数数字，在地图界面和战斗界面都能够
 *   流畅运行，可以确定消耗不大。并且，200事件与100事件都没有对
 *   变量框的消耗造成影响。
 *
 * -----------------------------------------------------------------------------
 * ----更新日志
 * [v1.0]
 * 完成插件ヽ(*。>Д<)o゜
 * [v1.1]
 * 修复了数值显示最大值的bug。
 * [v1.2]
 * 添加了刷菜单时不初始化数值的设置。
 * [v1.3]
 * 优化了层级位置。
 * [v1.4]
 * 添加了修改层值、自定义最大值的插件指令。
 * [v1.5]
 * 修改了插件关联的资源文件夹。
 * [v1.6]
 * 添加了地图活动镜头缩放时的支持。
 * [v1.7]
 * 翻新了整体结构，使其基于更宽泛的参数条、参数数字核心。
 * [v1.8]
 * 添加了部分插件指令。
 * [v1.9]
 * 添加了修改坐标的插件指令。
 * [v2.0]
 * 优化了 旧存档 中新加的数据不能同步更新的问题。
 * 
 * 
 * 
 * @param ---固定框样式---
 * @default
 *
 * @param 固定框样式-1
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==像素风格资源表==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==矩量水晶==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"false\\\",\\\"平移-名称 X\\\":\\\"10\\\",\\\"平移-名称 Y\\\":\\\"10\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"41\\\",\\\"平移-参数数字 X\\\":\\\"34\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\",\"{\\\"标签\\\":\\\"==分数得分==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"false\\\",\\\"平移-名称 X\\\":\\\"10\\\",\\\"平移-名称 Y\\\":\\\"10\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"42\\\",\\\"平移-参数数字 X\\\":\\\"174\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\",\"{\\\"标签\\\":\\\"==小型HP药水==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"false\\\",\\\"平移-名称 X\\\":\\\"10\\\",\\\"平移-名称 Y\\\":\\\"10\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"42\\\",\\\"平移-参数数字 X\\\":\\\"314\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\"]","---外框---":"","资源-固定框背景":"变量框像素风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 * 
 * @param 固定框样式-2
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==像素风格资源表(文字)==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==矩量水晶==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"-50\\\",\\\"平移-名称 Y\\\":\\\"3\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"41\\\",\\\"平移-参数数字 X\\\":\\\"34\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\",\"{\\\"标签\\\":\\\"==分数得分==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"130\\\",\\\"平移-名称 Y\\\":\\\"3\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"42\\\",\\\"平移-参数数字 X\\\":\\\"174\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\",\"{\\\"标签\\\":\\\"==小型HP药水==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"270\\\",\\\"平移-名称 Y\\\":\\\"3\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"42\\\",\\\"平移-参数数字 X\\\":\\\"314\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\"]","---外框---":"","资源-固定框背景":"","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 * 
 * @param 固定框样式-3
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==垂直表单风格==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==槽1==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"4\\\",\\\"平移-名称 Y\\\":\\\"2\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"true\\\",\\\"参数条样式\\\":\\\"1\\\",\\\"平移-参数条 X\\\":\\\"174\\\",\\\"平移-参数条 Y\\\":\\\"12\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"45\\\",\\\"平移-参数数字 X\\\":\\\"168\\\",\\\"平移-参数数字 Y\\\":\\\"16\\\"}\",\"{\\\"标签\\\":\\\"==槽2==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"4\\\",\\\"平移-名称 Y\\\":\\\"34\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"true\\\",\\\"参数条样式\\\":\\\"1\\\",\\\"平移-参数条 X\\\":\\\"174\\\",\\\"平移-参数条 Y\\\":\\\"44\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"45\\\",\\\"平移-参数数字 X\\\":\\\"168\\\",\\\"平移-参数数字 Y\\\":\\\"48\\\"}\",\"{\\\"标签\\\":\\\"==槽3==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"4\\\",\\\"平移-名称 Y\\\":\\\"66\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"true\\\",\\\"参数条样式\\\":\\\"1\\\",\\\"平移-参数条 X\\\":\\\"174\\\",\\\"平移-参数条 Y\\\":\\\"76\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"45\\\",\\\"平移-参数数字 X\\\":\\\"168\\\",\\\"平移-参数数字 Y\\\":\\\"80\\\"}\"]","---外框---":"","资源-固定框背景":"变量框垂直表单风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 * 
 * @param 固定框样式-4
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==标准风格==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==标准 参数数字+参数条 ==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"false\\\",\\\"平移-名称 X\\\":\\\"10\\\",\\\"平移-名称 Y\\\":\\\"10\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"true\\\",\\\"参数条样式\\\":\\\"41\\\",\\\"平移-参数条 X\\\":\\\"16\\\",\\\"平移-参数条 Y\\\":\\\"19\\\",\\\"是否启用加满动画\\\":\\\"false\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"43\\\",\\\"平移-参数数字 X\\\":\\\"256\\\",\\\"平移-参数数字 Y\\\":\\\"24\\\"}\"]","---外框---":"","资源-固定框背景":"变量框标准风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 * 
 * @param 固定框样式-5
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==标准风格(多段)==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==标准 参数数字+参数条 ==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"false\\\",\\\"平移-名称 X\\\":\\\"10\\\",\\\"平移-名称 Y\\\":\\\"10\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"true\\\",\\\"参数条样式\\\":\\\"42\\\",\\\"平移-参数条 X\\\":\\\"16\\\",\\\"平移-参数条 Y\\\":\\\"19\\\",\\\"是否启用加满动画\\\":\\\"false\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"43\\\",\\\"平移-参数数字 X\\\":\\\"256\\\",\\\"平移-参数数字 Y\\\":\\\"24\\\"}\"]","---外框---":"","资源-固定框背景":"变量框标准风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 * 
 * @param 固定框样式-6
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==凹槽板风格==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==凹槽板==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"15\\\",\\\"平移-名称 Y\\\":\\\"5\\\",\\\"名称字体大小\\\":\\\"22\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"true\\\",\\\"参数条样式\\\":\\\"43\\\",\\\"平移-参数条 X\\\":\\\"21\\\",\\\"平移-参数条 Y\\\":\\\"39\\\",\\\"是否启用加满动画\\\":\\\"false\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"44\\\",\\\"平移-参数数字 X\\\":\\\"180\\\",\\\"平移-参数数字 Y\\\":\\\"19\\\"}\"]","---外框---":"","资源-固定框背景":"变量框凹槽板风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 *
 * @param 固定框样式-7
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default {"标签":"==计分板风格==","---槽样式列表---":"","槽样式列表":"[\"{\\\"标签\\\":\\\"==计分板的数字==\\\",\\\"---名称显示---\\\":\\\"\\\",\\\"是否显示名称\\\":\\\"true\\\",\\\"平移-名称 X\\\":\\\"8\\\",\\\"平移-名称 Y\\\":\\\"18\\\",\\\"名称字体大小\\\":\\\"20\\\",\\\"---参数条---\\\":\\\"\\\",\\\"是否显示参数条\\\":\\\"false\\\",\\\"参数条样式\\\":\\\"0\\\",\\\"平移-参数条 X\\\":\\\"10\\\",\\\"平移-参数条 Y\\\":\\\"10\\\",\\\"是否启用加满动画\\\":\\\"true\\\",\\\"加满方式\\\":\\\"匀速加满\\\",\\\"加满持续时间\\\":\\\"90\\\",\\\"加满延迟\\\":\\\"30\\\",\\\"---参数数字---\\\":\\\"\\\",\\\"是否显示参数数字\\\":\\\"true\\\",\\\"参数数字样式\\\":\\\"44\\\",\\\"平移-参数数字 X\\\":\\\"90\\\",\\\"平移-参数数字 Y\\\":\\\"32\\\"}\"]","---外框---":"","资源-固定框背景":"变量框计分板风格-背景","平移-固定框背景 X":"0","平移-固定框背景 Y":"0","资源-固定框前景":"","平移-固定框前景 X":"0","平移-固定框前景 Y":"0"}
 *
 * @param 固定框样式-8
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-9
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-10
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-11
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-12
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-13
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-14
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-15
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-16
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-17
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-18
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-19
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param 固定框样式-20
 * @parent ---固定框样式---
 * @type struct<GFVStyle>
 * @desc 固定框样式的详细配置信息。
 * @default 
 *
 * @param ---变量框设置 1至20---
 * @default
 *
 * @param 变量框设置-1
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-2
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-3
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-4
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-5
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-6
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-7
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-8
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-9
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-10
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-11
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-12
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-13
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-14
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-15
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-16
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-17
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-18
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-19
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-20
 * @parent ---变量框设置 1至20---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param ---变量框设置21至40---
 * @default
 *
 * @param 变量框设置-21
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-22
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-23
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-24
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-25
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-26
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-27
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-28
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-29
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-30
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-31
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-32
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-33
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-34
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-35
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-36
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-37
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-38
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-39
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-40
 * @parent ---变量框设置21至40---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param ---变量框设置41至60---
 * @default
 *
 * @param 变量框设置-41
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-42
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-43
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-44
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-45
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-46
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-47
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-48
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-49
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-50
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-51
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-52
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-53
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-54
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-55
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-56
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-57
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-58
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-59
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 * @param 变量框设置-60
 * @parent ---变量框设置41至60---
 * @type struct<GFVBind>
 * @desc 绑定指定的变量，并设置在界面上。
 * @default 
 *
 */
/*~struct~GFVStyle:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的变量框样式==
 *
 * @param ---槽样式列表---
 * @desc 
 *
 * @param 槽样式列表
 * @parent ---槽样式列表---
 * @type struct<GFVStyleSlot>[]
 * @desc 你可以设置多个槽，用于展示多个参数信息。
 * @default []
 * 
 * @param ---外框---
 * @desc 
 *
 * @param 资源-固定框背景
 * @parent ---外框---
 * @desc 固定框背景的图片资源。
 * @default 变量固定框背景-默认
 * @require 1
 * @dir img/Special__variable/
 * @type file
 *
 * @param 平移-固定框背景 X
 * @parent ---外框---
 * @desc 修正校对背景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框背景 Y
 * @parent ---外框---
 * @desc 修正校对背景的位置用，y轴方向平移，单位像素。
 * @default 0
 *
 * @param 资源-固定框前景
 * @parent ---外框---
 * @desc 固定框前景的图片资源，可以遮住参数条。
 * @default 变量固定框前景-默认
 * @require 1
 * @dir img/Special__variable/
 * @type file
 *
 * @param 平移-固定框前景 X
 * @parent ---外框---
 * @desc 修正校对前景的位置用，x轴方向平移，单位像素。
 * @default 0
 *
 * @param 平移-固定框前景 Y
 * @parent ---外框---
 * @desc 修正校对前景的位置用，y轴方向平移，单位像素。
 * @default 0
 * 
 *
 */
/*~struct~GFVStyleSlot:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的槽样式==
 * 
 * 
 * @param ---名称显示---
 * @desc 
 * 
 * @param 是否显示名称
 * @parent ---名称显示---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default true
 * 
 * @param 平移-名称 X
 * @parent ---名称显示---
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 * 
 * @param 平移-名称 Y
 * @parent ---名称显示---
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 * 
 * @param 名称字体大小
 * @parent ---名称显示---
 * @type number
 * @min 1
 * @desc 名称的字体大小。
 * @default 20
 * 
 *
 * @param ---参数条---
 * @desc 
 * 
 * @param 是否显示参数条
 * @parent ---参数条---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 参数条样式
 * @parent 是否显示参数条
 * @type number
 * @min 0
 * @desc 参数条的样式，对应参数条核心中的配置的id值。
 * @default 0
 *
 * @param 平移-参数条 X
 * @parent 是否显示参数条
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 *
 * @param 平移-参数条 Y
 * @parent 是否显示参数条
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 * 
 * @param 是否启用加满动画
 * @parent 是否显示参数条
 * @type boolean
 * @on 播放
 * @off 不播放
 * @desc true - 播放，false - 不播放
 * @default true
 *
 * @param 加满方式
 * @parent 是否启用加满动画
 * @type select
 * @option 匀速加满
 * @value 匀速加满
 * @option 弹性加满
 * @value 弹性加满
 * @desc 参数条加满的方式。
 * @default 匀速加满
 *
 * @param 加满持续时间
 * @parent 是否启用加满动画
 * @type number
 * @min 1
 * @desc 动画将在时间内加满参数条，单位帧。（1秒60帧）
 * @default 90
 *
 * @param 加满延迟
 * @parent 是否启用加满动画
 * @type number
 * @min 0
 * @desc 浮动框出现后，播放加满动画的延迟时间，单位帧。（1秒60帧）
 * @default 30
 * 
 * @param ---参数数字---
 * @desc 
 * 
 * @param 是否显示参数数字
 * @parent ---参数数字---
 * @type boolean
 * @on 显示
 * @off 隐藏
 * @desc true - 显示，false - 隐藏
 * @default false
 *
 * @param 参数数字样式
 * @parent 是否显示参数数字
 * @type number
 * @min 0
 * @desc 参数数字的样式，对应参数数字核心中的配置的id值。
 * @default 0
 *
 * @param 平移-参数数字 X
 * @parent 是否显示参数数字
 * @desc 以样式框的位置为基准，x轴方向平移，单位像素。
 * @default 10
 * 
 * @param 平移-参数数字 Y
 * @parent 是否显示参数数字
 * @desc 以样式框的位置为基准，y轴方向平移，单位像素。
 * @default 10
 * 
 *
 */
/*~struct~GFVBind:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default --新的变量框设置--
 * 
 * @param ---绑定---
 * @desc 
 * 
 * @param 绑定的样式
 * @parent ---绑定---
 * @desc 该变量框对应的固定框样式的id。
 * @type number
 * @min 1
 * @default 1
 *
 * @param 槽数据列表
 * @parent ---绑定---
 * @type struct<GFVBindSlot>[]
 * @desc 样式中设置的槽，你需要对应初始化槽的数据。
 * @default []
 * 
 * @param ---常规---
 * @desc 
 * 
 * @param 初始是否显示
 * @parent ---常规---
 * @type boolean
 * @on 显示
 * @off 不显示
 * @desc true - 显示，false - 不显示
 * @default true
 *
 * @param 平移-固定框 X
 * @parent ---常规---
 * @desc x轴方向平移，单位像素。0为贴在最左边。
 * @default 0
 *
 * @param 平移-固定框 Y
 * @parent ---常规---
 * @desc y轴方向平移，单位像素。0为贴在最上面。
 * @default 0
 * 
 * @param 整体移动动画
 * @parent ---常规---
 * @type struct<DrillWindowMoving>
 * @desc 整个变量框会从某个点跑回自己的原位置。移动模式介绍可见 弹道核心-两点式。
 * @default {"移动类型":"弹性移动","移动时长":"30","移动延迟":"0","---起点---":"","坐标类型":"相对坐标","起点-相对坐标 X":"0","起点-相对坐标 Y":"100","起点-绝对坐标 X":"0","起点-绝对坐标 Y":"0"}
 * 
 *
 * @param ---界面层级---
 * @desc 
 *
 * @param 显示场合
 * @parent ---界面层级---
 * @type select
 * @option 只地图界面
 * @value 只地图界面
 * @option 只战斗界面
 * @value 只战斗界面
 * @option 都有
 * @value 都有
 * @desc 变量框场景显示的模式。
 * @default 都有
 *
 * @param 战斗界面图片层级
 * @parent ---界面层级---
 * @type number
 * @min 0
 * @desc 战斗界面中，固定放在战斗层级的 上层 ，图片层级控制这些层的先后顺序。与多层战斗背景的层级共享。
 * @default 10
 *
 * @param 地图界面图片层级
 * @parent ---界面层级---
 * @type number
 * @min 0
 * @desc 地图界面中，固定放在地图层级的 图片层 ，图片层级控制相同层的先后顺序。与多层地图背景的层级共享。
 * @default 10
 *
 */
/*~struct~GFVBindSlot:
 * 
 * @param 标签
 * @desc 只用于方便区分查看的标签，不作用在插件中。
 * @default ==新的槽数据==
 * 
 * @param 自定义段上限
 * @parent ---绑定---
 * @desc 作用于参数条。根据变量/物品的当前值，分配到 段 中显示。
 * @type number
 * @min 1
 * @default 10
 * 
 * @param 自定义额定值
 * @parent ---绑定---
 * @desc 作用于参数数字。这里的自定义额定值数据会覆盖，核心中的默认额定值。
 * @type number
 * @min 0
 * @default 10
 *
 * @param 自定义名称
 * @parent ---绑定---
 * @desc 指定槽位中显示的名称。
 * @default 新的变量名
 * 
 * @param 绑定类型
 * @parent ---绑定---
 * @type select
 * @option 绑定变量id
 * @value 绑定变量id
 * @option 绑定物品id
 * @value 绑定物品id
 * @desc 变量框场景显示的模式。
 * @default 绑定变量id
 * 
 * @param 绑定的变量id
 * @parent 绑定类型
 * @desc 变量类型下对应变量id号，如果是物品类型，此项无效。
 * @type variable
 * @default 0
 * 
 * @param 绑定的物品id
 * @parent 绑定类型
 * @desc 物品类型下对应变量id号，如果是变量类型，此项无效。
 * @type item
 * @default 0
 * 
 */
/*~struct~DrillWindowMoving:
 *
 * @param 移动类型
 * @type select
 * @option 不移动
 * @value 不移动
 * @option 匀速移动
 * @value 匀速移动
 * @option 增减速移动
 * @value 增减速移动
 * @option 弹性移动
 * @value 弹性移动
 * @desc 移动类型基于 弹道核心-两点式 移动。更多内容可以去看看 "1.系统 > 关于弹道.docx"。
 * @default 匀速移动
 *
 * @param 移动时长
 * @type number
 * @min 1
 * @desc 起点位置回到原位置所需的时间，单位帧。（1秒60帧）
 * @default 20
 *
 * @param 移动延迟
 * @type number
 * @min 0
 * @desc 开始移动前的等待时间，单位帧。（1秒60帧）
 * @default 0
 *
 * @param ---起点---
 * @default 
 *
 * @param 坐标类型
 * @parent ---起点---
 * @type select
 * @option 相对坐标
 * @value 相对坐标
 * @option 绝对坐标
 * @value 绝对坐标
 * @desc 起点的坐标类型。
 * @default 相对坐标
 *
 * @param 起点-相对坐标 X
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向右，正数向左，单位像素。
 * @default 100
 * 
 * @param 起点-相对坐标 Y
 * @parent ---起点---
 * @desc 相对坐标以原位置为基准，负数向上，正数向下，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 X
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最左边，单位像素。
 * @default 0
 * 
 * @param 起点-绝对坐标 Y
 * @parent ---起点---
 * @desc 绝对坐标以屏幕的位置为准，0表示贴在最上面，单位像素。
 * @default 0
 * 
 */
 
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//		插件简称：		GFV (Gauge_For_Variable)
//		临时全局变量	DrillUp.g_GFV_xxx
//		临时局部变量	this._drill_GFV_xxx
//		存储数据变量	$gameSystem._drill_GFV_xxx
//		全局存储变量	无
//		覆盖重写方法	无
//
//		工作类型		持续执行
//		时间复杂度		o(样式槽数)*o(n^3)*o(贴图处理)
//		性能测试因素	可视化管理层
//		性能测试消耗	30.04ms
//		最坏情况		暂无
//		备注			开了持续变化的参数条与参数数字，仍然能够流畅运行，可以确定消耗不大。
//
//插件记录：
//		★大体框架与功能如下：
//			固定框样式：
//				->外框
//					->背景
//					->前景
//				->槽样式
//					->参数条
//					->参数数字
//					->名称显示
//			变量框绑定：
//				->绑定
//					->样式
//					->槽数据
//						->段上限
//						->额定值
//						->名称
//				->位置/镜头修正
//				->整体移动动画
//					->弹道核心 控制
//				->图片层级
//					->战斗图片层级
//					->地图图片层级
//				->时机
//					->刷菜单时 动画不重复移动	x（暂时让玩家手动关闭吧，缺乏时机判定）
//					->刷菜单时 数值不滚动		x
//
//		
//		★配置参数结构体如下：
//			~struct~GFVStyle:				固定框样式
//			~struct~GFVStyleSlot:			槽样式列表
//			~struct~GFVBind:				变量框设置
//			~struct~GFVBindSlot:			槽数据列表
//			~struct~DrillWindowMoving:		整体移动动画（弹道核心-两点式）
//		
//		★私有类如下：
//			* Drill_GFV_StyleSprite【固定框样式】
//
//		★必要注意事项：
//			1.插件的图片层级与多个插件共享。【必须自写 层级排序 函数】
//			2.  变量框设置 和 贴图 一对一，容器内存放指针，【注意避免直接修改指针内容】
//					$gameSystem._drill_GFV_bindTank
//					$gameTemp._drill_GFV_spriteTank
//			3.【插件指令】的操作是实时性的，需要立即生效，无论战斗还是地图。分为两个情况：
//				刷菜单：bind数据直接存system中;
//				刷贴图：bind数据通过 'commandParamChanged' 参数进行贴图内容刷新;
//
//		★其它说明细节：
//			1.一个贴图对应一个绑定。
//		
//		★存在的问题：
//			暂无
//		

//=============================================================================
// ** 变量获取
//=============================================================================
　　var Imported = Imported || {};
　　Imported.Drill_GaugeForVariable = true;
　　var DrillUp = DrillUp || {}; 
	DrillUp.parameters = PluginManager.parameters('Drill_GaugeForVariable');
	
	
	//==============================
	// * 变量获取 - 变量固定框样式
	//				（~struct~GFVStyle）
	//==============================
	DrillUp.drill_GFV_initStyle = function( dataFrom ) {
		var data = {};
		// > 槽样式
		if( dataFrom["槽样式列表"] != undefined &&
			dataFrom["槽样式列表"] != "" ){
			data['slot_list'] = JSON.parse( dataFrom["槽样式列表"] || [] );
			for( var i=0; i < data['slot_list'].length; i++ ){
				var slot_dataFrom = JSON.parse( data['slot_list'][i] || {} );
				var slot_data = {};
				// > 名称显示
				slot_data['name_visible'] = String( slot_dataFrom["是否显示名称"] || "true") === "true";
				slot_data['name_x'] = Number( slot_dataFrom["平移-名称 X"] || 0 );
				slot_data['name_y'] = Number( slot_dataFrom["平移-名称 Y"] || 0 );
				slot_data['name_fontsize'] = Number( slot_dataFrom["名称字体大小"] || 20 );
				// > 参数条
				slot_data['meter_enable'] = String( slot_dataFrom["是否显示参数条"] || "true") === "true";
				slot_data['meter_id'] = Number( slot_dataFrom["参数条样式"] || 0 );
				slot_data['meter_x'] = Number( slot_dataFrom["平移-参数条 X"] || 0 );
				slot_data['meter_y'] = Number( slot_dataFrom["平移-参数条 Y"] || 0 );
				slot_data['meter_filling_enable'] = String( slot_dataFrom["是否启用加满动画"] || "true") === "true";
				slot_data['meter_filling_mode'] = String( slot_dataFrom["加满方式"] || "匀速加满" );
				slot_data['meter_filling_time'] = Number( slot_dataFrom["加满持续时间"] || 60 );
				slot_data['meter_filling_delay'] = Number( slot_dataFrom["加满延迟"] || 10 );
				// > 参数数字
				slot_data['symbol_visible'] = String( slot_dataFrom["是否显示参数数字"] || "true") === "true";
				slot_data['symbol_id'] = Number( slot_dataFrom["参数数字样式"] || 0 );
				slot_data['symbol_x'] = Number( slot_dataFrom["平移-参数数字 X"] || 0 );
				slot_data['symbol_y'] = Number( slot_dataFrom["平移-参数数字 Y"] || 0 );
				
				data['slot_list'][i] = slot_data;
			}
		}else{
			data['slot_list'] = [];
		}
		// > 外框
		data['background_src'] = String( dataFrom["资源-固定框背景"] || "" );
		data['background_x'] = Number( dataFrom["平移-固定框背景 X"] || 0 );
		data['background_y'] = Number( dataFrom["平移-固定框背景 Y"] || 0 );
		data['foreground_src'] = String( dataFrom["资源-固定框前景"] || "" );
		data['foreground_x'] = Number( dataFrom["平移-固定框前景 X"] || 0 );
		data['foreground_y'] = Number( dataFrom["平移-固定框前景 Y"] || 0 );
		
		return data;
	}
	
	//==============================
	// * 变量获取 - 变量设置
	//				（~struct~GFVBind）
	//==============================
	DrillUp.drill_GFV_initBind = function( dataFrom ) {
		var data = {};
		// > 绑定
		data['style_id'] = Number( dataFrom["绑定的样式"] || 0 );
		// > 槽数据
		if( dataFrom["槽数据列表"] != undefined &&
			dataFrom["槽数据列表"] != "" ){
			data['slot_list'] = JSON.parse( dataFrom["槽数据列表"] || [] );
			for( var i=0; i < data['slot_list'].length; i++ ){
				var slot_dataFrom = JSON.parse( data['slot_list'][i] || {} );
				var slot_data = {};
				slot_data['level_max'] = Number( slot_dataFrom["自定义段上限"] || 0 );
				slot_data['number_specified'] = Number( slot_dataFrom["自定义额定值"] || 0 );
				slot_data['name'] = String( slot_dataFrom["自定义名称"] || "true");
				slot_data['type'] = String( slot_dataFrom["绑定类型"] || "绑定变量id");
				slot_data['var_id'] = Number( slot_dataFrom["绑定的变量id"] || 0 );
				slot_data['item_id'] = Number( slot_dataFrom["绑定的物品id"] || 0 );
				data['slot_list'][i] = slot_data;
			}
		}else{
			data['slot_list'] = [];
		}
		// > 常规
		data['visible'] = String( dataFrom["初始是否显示"] || "true") === "true";
		data['frame_x'] = Number( dataFrom["平移-固定框 X"] || 0 );
		data['frame_y'] = Number( dataFrom["平移-固定框 Y"] || 0 );
		if( dataFrom["整体移动动画"] != undefined &&
			dataFrom["整体移动动画"] != "" ){
			var slideAnimFrom = JSON.parse( dataFrom["整体移动动画"] || {} );
			var slideAnim = {};
			slideAnim['slideMoveType'] = String(slideAnimFrom["移动类型"] || "匀速移动");
			slideAnim['slideTime'] = Number(slideAnimFrom["移动时长"] || 20);
			slideAnim['slideDelay'] = Number(slideAnimFrom["移动延迟"] || 0);
			slideAnim['slidePosType'] = String(slideAnimFrom["坐标类型"] || "相对坐标");
			slideAnim['slideX'] = Number(slideAnimFrom["起点-相对坐标 X"] || -100);
			slideAnim['slideY'] = Number(slideAnimFrom["起点-相对坐标 Y"] || 0);
			slideAnim['slideAbsoluteX'] = Number(slideAnimFrom["起点-绝对坐标 X"] || 0);
			slideAnim['slideAbsoluteY'] = Number(slideAnimFrom["起点-绝对坐标 Y"] || 0);
			data['slideAnim'] = slideAnim;
		}else{
			data['slideAnim'] = {};
		}
		// > 图片层级
		data['stageMode'] = String( dataFrom["显示场合"] || "只地图界面");
		data['zIndex_battle'] = Number( dataFrom["战斗界面图片层级"] || 10 );
		data['zIndex_map'] = Number( dataFrom["地图界面图片层级"] || 10 );
		
		return data;
	};
	
	
			
	/*----------------固定框样式---------------*/
	DrillUp.g_GFV_styleList_length = 20;
	DrillUp.g_GFV_styleList = [];
	for (var i = 0; i < DrillUp.g_GFV_styleList_length; i++) {
		if( DrillUp.parameters["固定框样式-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["固定框样式-" + String(i+1) ]);
			DrillUp.g_GFV_styleList[i] = DrillUp.drill_GFV_initStyle( data );
			DrillUp.g_GFV_styleList[i]['inited'] = true;
		}else{
			DrillUp.g_GFV_styleList[i] = {};
			DrillUp.g_GFV_styleList[i]['inited'] = false;
		}
	}
	
	/*----------------变量框设置---------------*/
	DrillUp.g_GFV_bind_length = 60;
	DrillUp.g_GFV_bind = [];
	for (var i = 0; i < DrillUp.g_GFV_bind_length; i++) {
		if( DrillUp.parameters["变量框设置-" + String(i+1) ] != "" ){
			var data = JSON.parse(DrillUp.parameters["变量框设置-" + String(i+1) ]);
			DrillUp.g_GFV_bind[i] = DrillUp.drill_GFV_initBind( data );
			DrillUp.g_GFV_bind[i]['inited'] = true;
		}else{
			DrillUp.g_GFV_bind[i] = {};
			DrillUp.g_GFV_bind[i]['inited'] = false;
		}
	}
	
	
	
//=============================================================================
// * >>>>基于插件检测>>>>
//=============================================================================
if( Imported.Drill_CoreOfBallistics &&
	Imported.Drill_CoreOfGaugeMeter &&
	Imported.Drill_CoreOfGaugeNumber ){
	
	
//=============================================================================
// ** 资源文件夹
//=============================================================================
ImageManager.load_SpecialVariable = function(filename) {
    return this.loadBitmap('img/Special__variable/', filename, 0, true);
};

//=============================================================================
// * 插件指令
//=============================================================================
var _drill_GFV_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
	_drill_GFV_pluginCommand.call(this, command, args);
	if (command === ">高级变量框") {
		var bind_ids = [];
		if( args.length >= 2 ){
			var temp1 = String(args[1]);
			if( temp1 == "全部框设置" ){
				for(var j = 0; j< $gameSystem._drill_GFV_bindTank.length; j++ ){
					bind_ids.push( j );
				}
			}else{
				temp1 = temp1.replace("框设置[","");
				temp1 = temp1.replace("]","");
				var id_list = temp1.split(",");
				for(var j = 0; j< id_list.length; j++ ){
					bind_ids.push( Number(id_list[j])-1 );
				}
			}
		}
		
		if(args.length == 4){		//>高级变量框 : 框设置[1] : 隐藏
			var temp2 = String(args[3]);
			if( temp2 == "显示" ){
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['visible'] = true;
				}
				$gameTemp._drill_GFV_needReflash = true;
			}
			if( temp2 == "隐藏" ){
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['visible'] = false;
				}
				$gameTemp._drill_GFV_needReflash = true;
			}
			if( temp2.indexOf("修改位置(变量)[") != -1 ){
				temp2 = temp2.replace("修改位置(变量)[","");
				temp2 = temp2.replace("]","");
				var temp_arr = temp2.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					e_pos = [ $gameVariables.value(Number(temp_arr[0])),
							  $gameVariables.value(Number(temp_arr[1])) ];
				
					for(var j = 0; j< bind_ids.length; j++ ){
						var id = bind_ids[j];
						$gameSystem._drill_GFV_bindTank[ id ]['frame_x'] = e_pos[0];
						$gameSystem._drill_GFV_bindTank[ id ]['frame_y'] = e_pos[1];
					}
					$gameTemp._drill_GFV_needReflash = true;
				}
			}
			else if( temp2.indexOf("修改位置[") != -1 ){
				temp2 = temp2.replace("修改位置[","");
				temp2 = temp2.replace("]","");
				var temp_arr = temp2.split(/[,，]/);
				if( temp_arr.length >= 2 ){
					e_pos = [ Number(temp_arr[0]),
							  Number(temp_arr[1]) ];
				
					for(var j = 0; j< bind_ids.length; j++ ){
						var id = bind_ids[j];
						$gameSystem._drill_GFV_bindTank[ id ]['frame_x'] = e_pos[0];
						$gameSystem._drill_GFV_bindTank[ id ]['frame_y'] = e_pos[1];
					}
					$gameTemp._drill_GFV_needReflash = true;
				}
			}
		}
		if(args.length == 6){		//>高级变量框 : 框设置[1] : 槽[1] : 显示名称
			var temp2 = String(args[3]);
			var temp3 = String(args[5]);
			temp2 = temp2.replace("槽[","");
			temp2 = temp2.replace("]","");
			
			if( temp3 == "显示名称" ){
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['name_visible'] = true;
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3 == "隐藏名称" ){
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['name_visible'] = false;
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3 == "显示参数数字" ){
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['symbol_visible'] = true;
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3 == "隐藏参数数字" ){
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['symbol_visible'] = false;
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3.indexOf("修改名称[") != -1 ){
				temp3 = temp3.replace("修改名称[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['name'] = String(temp3);
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3.indexOf("变量修改段上限[") != -1 ){
				temp3 = temp3.replace("变量修改段上限[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['level_max'] = $gameVariables.value( Number(temp3) );
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}else if( temp3.indexOf("修改段上限[") != -1 ){
				temp3 = temp3.replace("修改段上限[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['level_max'] = Number(temp3);
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3.indexOf("变量修改额定值[") != -1 ){
				temp3 = temp3.replace("变量修改额定值[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['number_specified'] = $gameVariables.value( Number(temp3) );
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}else if( temp3.indexOf("修改额定值[") != -1 ){
				temp3 = temp3.replace("修改额定值[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['number_specified'] = Number(temp3);
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3.indexOf("变量添加段上限[") != -1 ){
				temp3 = temp3.replace("变量添加段上限[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['level_max'] += $gameVariables.value( Number(temp3) );
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}else if( temp3.indexOf("添加段上限[") != -1 ){
				temp3 = temp3.replace("添加段上限[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['level_max'] += Number(temp3);
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
			if( temp3.indexOf("变量添加额定值[") != -1 ){
				temp3 = temp3.replace("变量添加额定值[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['number_specified'] += $gameVariables.value( Number(temp3) );
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}else if( temp3.indexOf("添加额定值[") != -1 ){
				temp3 = temp3.replace("添加额定值[","");
				temp3 = temp3.replace("]","");
				for(var j = 0; j< bind_ids.length; j++ ){
					var id = bind_ids[j];
					$gameSystem._drill_GFV_bindTank[ id ]['slot_list'][ Number(temp2)-1 ]['number_specified'] += Number(temp3);
					$gameSystem._drill_GFV_bindTank[ id ]['commandParamChanged'] = true;
				}
			}
		}
	}
};

//=============================================================================
// * 临时数据
//=============================================================================
//==============================
// * 临时数据 - 初始化
//==============================
var _drill_GFV_temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
	_drill_GFV_temp_initialize.call(this);
	this._drill_GFV_needReflash = true;			// 容器刷新
	this._drill_GFV_spriteTank = [];			// 战斗/地图 贴图容器（记得随时清空）
}
//=============================================================================
// * 存储数据
//=============================================================================
//==============================
// * 存储数据 - 初始化
//==============================
var _drill_GFV_sys_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_drill_GFV_sys_initialize.call(this);
	
	this._drill_GFV_bindTank = [];				// 绑定数据容器
	for(var i = 0; i < DrillUp.g_GFV_bind.length; i++ ){
		var temp_bind = JSON.parse(JSON.stringify( DrillUp.g_GFV_bind[i] ));
		this._drill_GFV_bindTank.push( temp_bind );
	}
}
//==============================
// * 管理器 - 读取数据
//==============================
var _drill_GFV_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function( contents ){
	_drill_GFV_extractSaveContents.call( this, contents );
	$gameSystem.drill_GFV_checkData();
}
//==============================
// * 管理器 - 检查数据
//==============================
Game_System.prototype.drill_GFV_checkData = function() {
	
	// > 绑定数据容器
	for(var i = 0; i < DrillUp.g_GFV_bind.length; i++ ){
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_GFV_bind[i] ));
		
		// > 已配置（'inited'为 false 表示空数据）
		if( temp_data['inited'] == true ){
			
			// > 未存储的，重新初始化
			if( this._drill_GFV_bindTank[i] == undefined ||
				this._drill_GFV_bindTank[i]['inited'] == false ){
				this._drill_GFV_bindTank[i] = temp_data;
			
			// > 已存储的，跳过
			}else{
				//（不操作）
			}
		}
	}
}



//=============================================================================
// * 地图层级
//=============================================================================
//==============================
// ** 图片层
//==============================
var _drill_GFV_map_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFV_map_createPictures.call(this);		//rmmv图片 < 图片层 < rmmv对话框
	if( !this._drill_mapPicArea ){
		this._drill_mapPicArea = new Sprite();
		this.addChild(this._drill_mapPicArea);	
	}
}
//==============================
// ** 层级排序
//==============================
Spriteset_Map.prototype.drill_GFV_sortByZIndex = function() {
	this._drill_mapPicArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//=============================================================================
// * 地图界面 固定框贴图容器
//=============================================================================
//==============================
// * 地图容器 - 切换地图时
//==============================
var _drill_GFV_gmap_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	$gameTemp._drill_GFV_spriteTank = [];
	$gameTemp._drill_GFV_needRefresh = true;
	_drill_GFV_gmap_setup.call(this,mapId);
}
//==============================
// * 地图容器 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_GFV_ms_createPictures = Spriteset_Map.prototype.createPictures;
Spriteset_Map.prototype.createPictures = function() {
	_drill_GFV_ms_createPictures.call(this);
	$gameTemp._drill_GFV_spriteTank = [];
	$gameTemp._drill_GFV_needReflash = true;
};
//==============================
// * 地图容器 - 帧刷新
//==============================
var _drill_GFV_smap_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {	
	_drill_GFV_smap_update.call(this);
	if( $gameTemp._drill_GFV_needReflash == true ){
		$gameTemp._drill_GFV_needReflash = false;
		this.drill_GFV_refreshGauge();
	}
};
//==============================
// * 地图容器 - 重刷
//==============================
Spriteset_Map.prototype.drill_GFV_refreshGauge = function() {
	this.drill_GFV_removeGauge();		//清除判断
	this.drill_GFV_createGauge();		//创建判断
	this.drill_GFV_sortByZIndex();		//层级排序
}
//==============================
// * 地图容器 - 单体清除判断（并非切换界面时的全体清除）
//==============================
Spriteset_Map.prototype.drill_GFV_removeGauge = function() {
	for(var i=0; i < $gameSystem._drill_GFV_bindTank.length; i++){
		var temp_bind = $gameSystem._drill_GFV_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFV_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_sprite == null ){ continue; }
		
		if( temp_bind['visible'] == false &&  temp_sprite._drill_foldTime <= 0 ){	//关闭显示+完全消失 时清除
			this._drill_mapPicArea.removeChild( temp_sprite );
			$gameTemp._drill_GFV_spriteTank[i] = null;
		}
	}
}
//==============================
// * 地图容器 - 创建判断
//==============================
Spriteset_Map.prototype.drill_GFV_createGauge = function() {
	for(var i = 0; i< $gameSystem._drill_GFV_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_GFV_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFV_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_sprite != null ){ continue; }
		if( temp_bind['visible'] == true && 
			( temp_bind['stageMode'] == "都有" || temp_bind['stageMode'] == "只地图界面" ) ){

			temp_bind['parentName'] = "Spriteset_Map";
			var temp_sprite = new Drill_GFV_StyleSprite( temp_bind );
			this._drill_mapPicArea.addChild(temp_sprite);
			$gameTemp._drill_GFV_spriteTank[i] = temp_sprite;
		}
	}
}



//=============================================================================
// ** 战斗层级
//=============================================================================
//==============================
// ** 上层
//==============================
var _drill_GFV_battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GFV_battle_createLowerLayer.call(this);
	if( !this._drill_battleUpArea ){
		this._drill_battleUpArea = new Sprite();
		this._drill_battleUpArea.z = 9999;	//（yep层级适配，YEP_BattleEngineCore）
		this._battleField.addChild(this._drill_battleUpArea);
	}
};
//==============================
// ** 层级排序
//==============================
Spriteset_Battle.prototype.drill_GFV_sortByZIndex = function() {
	this._drill_battleUpArea.children.sort(function(a, b){return a.zIndex-b.zIndex});
};
//=============================================================================
// * 战斗界面 固定框贴图容器
//=============================================================================
//==============================
// * 战斗界面 - 切换贴图时（菜单界面刷新）
//==============================
var _drill_GFV_bs_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _drill_GFV_bs_createLowerLayer.call(this);
	$gameTemp._drill_GFV_spriteTank = [];
	$gameTemp._drill_GFV_needReflash = true;
}
//==============================
// * 战斗容器 - 帧刷新
//==============================
var _drill_GFV_sbattle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _drill_GFV_sbattle_update.call(this);
	if( $gameTemp._drill_GFV_needReflash == true ){
		$gameTemp._drill_GFV_needReflash = false;
		this.drill_GFV_refreshGauge();
	}
};
//==============================
// * 战斗容器 - 重刷
//==============================
Spriteset_Battle.prototype.drill_GFV_refreshGauge = function() {
	this.drill_GFV_removeGauge();		//清除判断
	this.drill_GFV_createGauge();		//创建判断
	this.drill_GFV_sortByZIndex();		//层级排序
}
//==============================
// * 战斗容器 - 单体清除判断（并非切换界面时的全体清除）
//==============================
Spriteset_Battle.prototype.drill_GFV_removeGauge = function() {
	for(var i=0; i < $gameSystem._drill_GFV_bindTank.length; i++){
		var temp_bind = $gameSystem._drill_GFV_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFV_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_sprite == null ){ continue; }
		
		if( temp_bind['visible'] == false &&  temp_sprite._drill_foldTime <= 0 ){	//关闭显示+完全消失 时清除
			this._drill_battleUpArea.removeChild( temp_sprite );
			$gameTemp._drill_GFV_spriteTank[i] = null;
		}
	}
}
//==============================
// * 战斗容器 - 创建判断
//==============================
Spriteset_Battle.prototype.drill_GFV_createGauge = function() {
	for(var i = 0; i< $gameSystem._drill_GFV_bindTank.length; i++ ){
		var temp_bind = $gameSystem._drill_GFV_bindTank[i];
		var temp_sprite = $gameTemp._drill_GFV_spriteTank[i];		//一个贴图对应一个绑定
		if( temp_sprite != null ){ continue; }
		if( temp_bind['visible'] == true && 
			( temp_bind['stageMode'] == "都有" || temp_bind['stageMode'] == "只战斗界面" ) ){

			temp_bind['parentName'] = "Spriteset_Battle";
			var temp_sprite = new Drill_GFV_StyleSprite( temp_bind );
			this._drill_battleUpArea.addChild(temp_sprite);
			$gameTemp._drill_GFV_spriteTank[i] = temp_sprite;
		}
	}
}



//=============================================================================
// * 固定框样式【Drill_GFV_StyleSprite】
//	
//			代码：	> 范围 - 该类对于变量设置的固定框进行多层可视化。
//					> 结构 - [合并/分离/ ●混乱 ] 数据和贴图混乱交错。贴图自身带数据，插件指令单独管另一套数据。
//												 这里的结构为：插件指令修改数据，放入缓存，然后贴图根据缓存数据，自变化（drill_updateCommandParam）。
//					> 数量 - [单个/ ●多个 ] 
//					> 创建 - [ ●一次性/ 自延迟/外部延迟] 
//					> 销毁 - [ ●不考虑 /自销毁/外部销毁] 
//					> 样式 - [不可修改/ ●自变化 /外部变化] 
//=============================================================================
//==============================
// * 固定框 - 定义
//==============================
function Drill_GFV_StyleSprite() {
    this.initialize.apply(this, arguments);
};
Drill_GFV_StyleSprite.prototype = Object.create(Sprite.prototype);
Drill_GFV_StyleSprite.prototype.constructor = Drill_GFV_StyleSprite;
//==============================
// * 固定框 - 初始化
//==============================
Drill_GFV_StyleSprite.prototype.initialize = function( bind ) {
	Sprite.prototype.initialize.call(this);
	this._drill_data_bind = bind;											//绑定数据
	this._drill_data_style = DrillUp.g_GFV_styleList[ bind['style_id']-1 ];	//样式数据
	
	this.drill_initData();				//初始化数据
	this.drill_initSprite();			//初始化对象
}
//==============================
// * 固定框 - 帧刷新
//==============================
Drill_GFV_StyleSprite.prototype.update = function() {
	Sprite.prototype.update.call(this);
	
	this.drill_updateSprite();			//帧刷新对象
}
//==============================
// * 初始化 - 数据
//==============================
Drill_GFV_StyleSprite.prototype.drill_initData = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 私有对象初始化
	this._drill_time = 0;						//时间
	this._drill_foldTime = 0;					//出现/消失时间
	this._drill_background_sprite = null;		//背景贴图
	this._drill_foreground_sprite = null;		//前景贴图
	
	this._drill_meterSpriteTank = [];			//参数条容器
	this._drill_numberSpriteTank = [];			//参数数字容器
	this._drill_name_spriteTank = [];			//名称贴图容器
	
	// > 样式参数 转移到 实例参数
	data_b['commandParamChanged'] = false;		//插件指令扫描指针
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		if( slot_b == undefined ){ continue; }
		if( slot_b['symbol_visible'] == undefined ){ slot_b['symbol_visible'] = slot_s['symbol_visible']; }	
		if( slot_b['name_visible'] == undefined ){ slot_b['name_visible'] = slot_s['name_visible']; }	
	}
	
	
	// > 主体属性
	this.x = data_b['frame_x'];
	this.y = data_b['frame_y'];
	this.opacity = 0;
	this.visible = true;		//创建了，就一定显示（ data_b['visible']控制的是出现/消失过程 ）
	if( data_b['parentName'] == "Spriteset_Map" ){ this.zIndex = data_b['zIndex_map']; }
	if( data_b['parentName'] == "Spriteset_Battle" ){ this.zIndex = data_b['zIndex_battle']; }
	this.width = Graphics.boxWidth;
	this.height = Graphics.boxHeight;
}
//==============================
// * 初始化 - 对象
//==============================
Drill_GFV_StyleSprite.prototype.drill_initSprite = function() {

	this.drill_initPreMove();			//预推演初始移动动画
	
	this.drill_createBackground();		//创建背景
	this.drill_createMeterList();		//创建参数条
	this.drill_createForeground();		//创建前景
	
	this.drill_createNameList();		//创建名称
	this.drill_createNumberList();		//创建参数数字
};
//==============================
// * 预推演初始移动动画
//==============================
Drill_GFV_StyleSprite.prototype.drill_initPreMove = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 移动动画参数 转 两点式弹道
	var data = {};
	data['movementMode'] = "两点式";
	data['movementTime'] = data_b['slideAnim']['slideTime'];
	data['movementDelay']= data_b['slideAnim']['slideDelay'];
	data['twoPointType'] = data_b['slideAnim']['slideMoveType'];
	if( data_b['slideAnim']['slidePosType'] == "相对坐标" ){
		data['twoPointDifferenceX'] = data_b['slideAnim']['slideX'];
		data['twoPointDifferenceY'] = data_b['slideAnim']['slideY'];
	}else{
		data['twoPointDifferenceX'] = data_b['slideAnim']['slideAbsoluteX'] - data_b['frame_x'];
		data['twoPointDifferenceY'] = data_b['slideAnim']['slideAbsoluteY'] - data_b['frame_y'];
	}
	//alert(JSON.stringify(data_b['slideAnim']));
	
	$gameTemp.drill_COBa_setBallisticsMove( data );													//初始化
	$gameTemp.drill_COBa_preBallisticsMove( this, 0 , data_b['frame_x'], data_b['frame_y'] );		//推演赋值
}
//==============================
// * 创建 - 背景
//==============================
Drill_GFV_StyleSprite.prototype.drill_createBackground = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialVariable( data_s['background_src'] );
	temp_sprite.x = this._drill_data_style['background_x'];
	temp_sprite.y = this._drill_data_style['background_y'];
	this.addChild(temp_sprite);
	this._drill_background_sprite = temp_sprite;
}
//==============================
// * 创建 - 前景
//==============================
Drill_GFV_StyleSprite.prototype.drill_createForeground = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	var temp_sprite = new Sprite();
	temp_sprite.bitmap = ImageManager.load_SpecialVariable( data_s['foreground_src'] );
	temp_sprite.x = this._drill_data_style['foreground_x'];
	temp_sprite.y = this._drill_data_style['foreground_y'];
	this.addChild(temp_sprite);
	this._drill_foreground_sprite = temp_sprite;
}
//==============================
// * 创建 - 参数条
//==============================
Drill_GFV_StyleSprite.prototype.drill_createMeterList = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['slot_list'].length == 0 ){ return }
	if( data_s['slot_list'].length == 0 ){ return }
	
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		this._drill_meterSpriteTank[i] = null;
		
		if( slot_b == undefined ){ continue; }
		if( slot_s['meter_enable'] != true ){ continue; }	//（不显示，则不创建）
		if( slot_s['meter_id'] == 0 ){ continue; }
		
		// > 参数条 数据初始化
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_COGM_list[ slot_s['meter_id']-1 ] ));	//深拷贝数据
		temp_data['level_max'] = slot_b['level_max'];						//段上限
		temp_data['x'] = slot_s['meter_x'];									//x
		temp_data['y'] = slot_s['meter_y'];									//y
		temp_data['anchor_x'] = 0.0;										//中心锚点x
		temp_data['anchor_y'] = 0.0;										//中心锚点y
		temp_data['filling_enable'] = slot_s['meter_filling_enable'];		//加满动画
		temp_data['filling_mode'] = slot_s['meter_filling_mode'];			//
		temp_data['filling_time'] = slot_s['meter_filling_time'];			//
		temp_data['filling_delay'] = slot_s['meter_filling_delay'];			//
		
		// > 参数条 贴图初始化
		var temp_sprite = new Drill_COGM_MeterSprite( temp_data );
		this.addChild( temp_sprite );
		this._drill_meterSpriteTank[i] = temp_sprite;
	}
}
//==============================
// * 创建 - 参数数字
//==============================
Drill_GFV_StyleSprite.prototype.drill_createNumberList = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['slot_list'].length == 0 ){ return }
	if( data_s['slot_list'].length == 0 ){ return }
	
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		this._drill_numberSpriteTank[i] = null;
		
		if( slot_b == undefined ){ continue; }
		if( slot_s['symbol_id'] == 0 ){ continue; }
		
		// > 参数数字 数据初始化
		var temp_data = JSON.parse(JSON.stringify( DrillUp.g_COGN_list[ slot_s['symbol_id']-1 ] ));	//深拷贝数据
		temp_data['x'] = slot_s['symbol_x'];								//x
		temp_data['y'] = slot_s['symbol_y'];								//y
		temp_data['visible'] = slot_b['symbol_visible'];					//（不显示，也要创建）
		temp_data['specified_conditionNum'] = slot_b['number_specified'];	//额定数值

		// > 参数数字 贴图初始化
		var temp_sprite = new Drill_COGN_NumberSprite( temp_data );
		this.addChild( temp_sprite );
		this._drill_numberSpriteTank[i] = temp_sprite;
	}
}
//==============================
// * 创建 - 名称
//==============================
Drill_GFV_StyleSprite.prototype.drill_createNameList = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['slot_list'].length == 0 ){ return }
	if( data_s['slot_list'].length == 0 ){ return }
	
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		this._drill_name_spriteTank[i] = null;
		if( slot_b == undefined ){ continue; }
	
		// > 名称初始化
		var temp_sprite = new Sprite();
		temp_sprite.x = slot_s['name_x'];
		temp_sprite.y = slot_s['name_y'];
		temp_sprite.visible = slot_b['name_visible'];		//（不显示，也要创建）
		
		// > 绘制字符
		temp_sprite.bitmap = new Bitmap(360, slot_s['name_fontsize'] + 4 );
		temp_sprite.bitmap.fontSize = slot_s['name_fontsize'];
		this.addChild(temp_sprite);
		this._drill_name_spriteTank[i] = temp_sprite;
		this.drill_drawName(i);
	}
}
//==============================
// * 名称 - 绘制（继承接口）
//==============================
Drill_GFV_StyleSprite.prototype.drill_drawName = function( i ) {
	var temp_slot = this._drill_data_bind['slot_list'][i];
	var temp_sprite = this._drill_name_spriteTank[i];
	temp_sprite.bitmap.clear();
	temp_sprite.bitmap.drawText(
		temp_slot['name'], 
		0, 0, temp_sprite.bitmap.width, temp_sprite.bitmap.height, 0 );	
}

//==============================
// * 帧刷新对象
//==============================
Drill_GFV_StyleSprite.prototype.drill_updateSprite = function() {
	this._drill_time += 1;
	
	this.drill_updateMeter();			//参数条
	this.drill_updateNumber();			//参数数字
	this.drill_updatePosition();		//位移+透明度
	this.drill_updateCommandParam();	//插件指令修改参数
}
//==============================
// * 帧刷新 - 参数条
//==============================
Drill_GFV_StyleSprite.prototype.drill_updateMeter = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['slot_list'].length == 0 ){ return }
	if( data_s['slot_list'].length == 0 ){ return }
	
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		if( slot_b == undefined ){ continue; }
		
		// > 参数条值刷新
		var param_value = 0;
		if( slot_b['type'] == "绑定变量id" ){
			param_value = Number( $gameVariables.value( slot_b['var_id'] ) );
		}else{
			param_value = Number( $gameParty.numItems( $dataItems[ slot_b['item_id'] ] ) );
		}
		if( this._drill_meterSpriteTank[i] ){
			this._drill_meterSpriteTank[i].drill_COGM_reflashValue( param_value );
		}
	}
}
//==============================
// * 帧刷新 - 参数数字
//==============================
Drill_GFV_StyleSprite.prototype.drill_updateNumber = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['slot_list'].length == 0 ){ return }
	if( data_s['slot_list'].length == 0 ){ return }
	
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		if( slot_b == undefined ){ continue; }
		
		// > 参数数字值刷新
		var param_value = 0;
		if( slot_b['type'] == "绑定变量id" ){
			param_value = Number( $gameVariables.value( slot_b['var_id'] ) );
		}else{
			param_value = Number( $gameParty.numItems( $dataItems[ slot_b['item_id'] ] ) );
		}
		if( this._drill_numberSpriteTank[i] ){
			this._drill_numberSpriteTank[i].drill_COGN_reflashValue( param_value );
		}
	}
}
//==============================
// * 帧刷新 - 位移+透明度
//==============================
Drill_GFV_StyleSprite.prototype.drill_updatePosition = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	
	// > 出现/消失控制
	var end_index = this['_drill_COBa_x'].length - 1;
	if( data_b['visible'] == true ){
		this._drill_foldTime += 1;
	}else{
		this._drill_foldTime -= 1;
	}
	if( this._drill_foldTime > end_index ){ this._drill_foldTime = end_index; }
	if( this._drill_foldTime < 0 ){ this._drill_foldTime = 0; }
	
	// > 出现/消失控制
	var time = this._drill_foldTime;
	var xx = data_b['frame_x'] + this['_drill_COBa_x'][ end_index ] - this['_drill_COBa_x'][ time ];
	var yy = data_b['frame_y'] + this['_drill_COBa_y'][ end_index ] - this['_drill_COBa_y'][ time ];
	
	if( Imported.Drill_BattleCamera && 	//战斗镜头修正（由于镜头实时会变，xy需要时刻固定重新计算位置）
		data_b['parentName'] == "Spriteset_Battle" ){
		xx -= $gameTemp._drill_cam_pos[0];
		yy -= $gameTemp._drill_cam_pos[1];
	}
	if( Imported.Drill_LayerCamera && 	//地图镜头修正（处于下层/中层/上层/图片层，需要一起缩放）
		data_b['parentName'] == "Spriteset_Map" ){
		xx = $gameSystem.drill_LCa_cameraToMapX( xx );
		yy = $gameSystem.drill_LCa_cameraToMapY( yy );
		this.scale.x = 1.00 / $gameSystem.drill_LCa_curScaleX();
		this.scale.y = 1.00 / $gameSystem.drill_LCa_curScaleY();
	}
	
	this.opacity = 255 * time / this['_drill_COBa_x'].length;
	this.x = Math.floor(xx);
	this.y = Math.floor(yy);
}
//==============================
// * 帧刷新 - 插件指令修改参数
//==============================
Drill_GFV_StyleSprite.prototype.drill_updateCommandParam = function() {
	var data_b = this._drill_data_bind;
	var data_s = this._drill_data_style;
	if( data_b['slot_list'].length == 0 ){ return }
	if( data_s['slot_list'].length == 0 ){ return }
	if( data_b['commandParamChanged'] == false ){ return; }
	data_b['commandParamChanged'] = false;
	
	for(var i=0; i < data_s['slot_list'].length; i++ ){
		var slot_s = data_s['slot_list'][i];
		var slot_b = data_b['slot_list'][i];
		if( slot_b == undefined ){ continue; }
		
		//（此函数在现有贴图中修改，插件指令直接在$gameSystem中修改不会立即生效，需要刷贴图与刷菜单才能生效）

		// > 段上限
		if( this._drill_meterSpriteTank[i] ){
			this._drill_meterSpriteTank[i].drill_COGM_setLevelMax( slot_b['level_max'] );
		}
		
		// > 额定值
		if( this._drill_numberSpriteTank[i] ){
			this._drill_numberSpriteTank[i].drill_COGN_setSpecifiedNum( slot_b['number_specified'] );
		}
		
		// > 数字显示
		if( this._drill_numberSpriteTank[i] ){
			this._drill_numberSpriteTank[i].drill_COGN_setVisible( slot_b['symbol_visible'] );
		}
		
		// > 名称文本
		this.drill_drawName( i );
		
		// > 名称显示
		this._drill_name_spriteTank[i].visible = slot_b['name_visible'];
	}
}



//=============================================================================
// * <<<<基于插件检测<<<<
//=============================================================================
}else{
		Imported.Drill_GaugeForVariable = false;
		alert(
			"【Drill_GaugeForVariable.js  UI - 高级变量固定框】\n缺少基础插件，去看看下列插件是不是 未添加 / 被关闭 / 顺序不对："+
			"\n- Drill_CoreOfBallistics  系统-弹道核心"+
			"\n- Drill_CoreOfGaugeMeter  系统-参数条核心"+
			"\n- Drill_CoreOfGaugeNumber 系统-参数数字核心"
		);
}




