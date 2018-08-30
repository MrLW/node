# 数据持久化
seneca-entity提供一个简单的数据抽象层（ORM）:
- load：根据实体标识加载一个实体
- save：创建或更新（如果你提供了一个标识的话）一个实体
- list：列出匹配查询条件的所有实体
- remove：删除一个标识指定的实体
对应的匹配模式:
- load： role:entity,cmd:load,name:<entity-name>
- save： role:entity,cmd:save,name:<entity-name>
- list： role:entity,cmd:list,name:<entity-name>
- remove： role:entity,cmd:remove,name:<entity-name>

seneca.make():创建记录对象,生成的对象有load$、save$、list$ 以及 remove$方法.在应用时需要安装seneca-entity模块,但是不需要引入,只需使用seneca加载即可.
```
seneca.use('basic').use('entity');

```

