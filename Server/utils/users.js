class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, name, score){
        var user = {id, name, score};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        var user = this.getUser(id);
        
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user;
    }
    getUser(id){
        return this.users.filter((user) => user.id === id)[0]
    }
    getUserList(){
        return this.users;
    }
    increasePersonalCount(id){
        var user = this.getUser(id);
        user.score += 1;
    }
    updateName(id, newName){
        var user = this.getUser(id);
        user.name = newName;
    }
    updateScore(id, newScore){
        var user = this.getUser(id);
        user.score = newScore;
    }
}

module.exports = {Users};