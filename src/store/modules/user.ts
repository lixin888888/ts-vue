import {Action, getModule, Module, Mutation, VuexModule} from "vuex-module-decorators";
import {login} from "@/api/users";
import {getToken, removeToken} from "@/utils/cookies";
import store from "@/store";

export interface IUserState {
    token: string;
    name: string;
    avatar: string;
    introduction: string;
    roles: string[];
}

// @Module 标记当前为module
// module本身有几种可以配置的属性
// 1、namespaced:boolean 启/停用 分模块
// 2、stateFactory:boolean 状态工厂
// 3、dynamic:boolean 在store创建之后，再添加到store中。 开启dynamic之后必须提供下面的属性
// 4、name:string 指定模块名称
// 5、store:Vuex.Store实体 提供初始的store
@Module({dynamic: true, store, name: "user"})
class User extends VuexModule implements IUserState {
    // 在需要引用的地方单独引用该store文件即可注入。
    // 好处：灵活使用，仅仅在需要引入的地方才注入到store中去
    // 缺点：需要单独引入文件

    /* 这里代表的就是state里面的状态 */
    public token = getToken() || "";
    public name = "";
    public avatar = "";
    public introduction = "";
    public roles: string[] = [];

    // @Action 标注为action
    @Action
    public async Login(userInfo: { userName: string; passWord: string }) {
        let {userName, passWord} = userInfo;
        userName = userName.trim();
        const data = {
            accessToken: "admin_token"
        }
        this.SET_TOKEN(data.accessToken);
        //this.SET_ROLES(["admin"]);
        this.SET_NAME(userName);
        this.SET_AVATAR("");
        this.SET_INTRODUCTION("");

    }

    @Action
    public HandleLogin() {
        this.token = "login"
    }

    @Action
    public ResetToken() {
        // 重置token（清空操作），需重新登录
        removeToken();
        this.SET_TOKEN("");
        this.SET_ROLES([]);
    }

    @Action
    public async GetUserInfo() {
        console.log("GetUserInfo")
        console.log(UserModule.token)
        /*// 获取用户信息
        if (this.token === "") {
          throw Error("GetUserInfo: token is undefined!");
        }
        const { data } = await getUserInfo({
          /!* Your params here *!/
        });
        console.log("用户信息", data);
        if (!data) {
          throw Error("Verification failed, please Login again.");
        }
        const { roles, name, avatar, introduction } = data.user;
        console.log("avatar", avatar);
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          throw Error("GetUserInfo: roles must be a non-null array!");
        }*/
        if (this.token == "") {
            console.log("GetUserInfo: token is undefined!")
            throw Error("GetUserInfo: token is undefined!");
        }
        this.SET_ROLES(["admin"]);
        /*this.SET_NAME("lixin");
        this.SET_AVATAR("");
        this.SET_INTRODUCTION("");*/
    }

    @Action
    public async LogOut() {
        // 注销
        if (this.token === "") {
            throw Error("LogOut: token is undefined!");
        }
        //await logout();
        //removeToken();
        this.SET_TOKEN("out");
        this.SET_ROLES([]);
    }

    @Action
    public async Fresh() {
        this.SET_ROLES([])
    }

    // @Mutation 标注为mutation
    @Mutation
    private SET_TOKEN(token: string) {
        // 设置token
        this.token = token;
    }

    @Mutation
    private SET_NAME(name: string) {
        // 设置用户名
        this.name = name;
    }

    @Mutation
    private SET_AVATAR(avatar: string) {
        // 设置头像
        this.avatar = avatar;
    }

    @Mutation
    private SET_INTRODUCTION(introduction: string) {
        // 设置介绍
        this.introduction = introduction;
    }

    @Mutation
    private SET_ROLES(roles: string[]) {
        // 设置角色
        this.roles = roles;
    }

}

// getModule 得到一个类型安全的store，module必须提供name属性
export const UserModule = getModule(User);
