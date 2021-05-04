import mongoose from "mongoose"
const { Schema } = mongoose;

const passwordSchema = new mongoose.Schema({
    password: String,
    salt: Number
})
const imageSchema = new mongoose.Schema({
    src: String,
    width: Number,
    height: Number
})

const UserSchema = new mongoose.Schema({
    name: {type:String, reuquired: true,},
    email: {type: String, required: true,},
    password: {
        pass: String,
        salt: String
    },
    image: {type: String,required: false},
    age: Number,
    sex: String,
    adress: String,
    bio: String,
    birth: String,
    myGroup: [{type: Schema.Types.ObjectId, ref: 'Group'}],
   // posts: [PostsSchema],
   // schedule: [ScheduleSchema]
},{ timestamps: true});


const GroupSchema = new mongoose.Schema({
    name:String,
    bio: String,
    MyUser: [{ type: Schema.Types.ObjectId, ref: 'User'}],
   // schedule: [scheduleSchema],
    postBoard: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    image: [imageSchema],
    
},{ timestamps: true});

const PostsSchema = new mongoose.Schema({
    title: String,
    writer: { type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    image: [imageSchema],
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
    likes : [{type: Schema.Types.ObjectId, ref: 'LikePost'}],
    commnet_count: Number,
    like_count: Number,
},{ timestamps: true})

const CommentSchema = new mongoose.Schema({
    content: String,
    likes: [{type: Schema.Types.ObjectId, ref: 'LikeCommnet'}],
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'},
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
},{timestamps: true})

const LikeCommentSchema = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    commnet_id: {type: Schema.Types.ObjectId, ref: 'Comment'}
},{timestamps: true});

const LikePostSchema = new mongoose.Schema({
    user_id: {type: Schema.Types.ObjectId, ref: 'User'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'}
},{timestamps: true});


const User = mongoose.model('User',UserSchema);
const Group = mongoose.model('Group',GroupSchema);
const Post = mongoose.model('Post', PostsSchema);
const Comment = mongoose.model('Comment',CommentSchema);
const LikeComment = mongoose.model('LikeComment',LikeCommentSchema);
const LikePost = mongoose.model('LikePost',LikePostSchema);

export {
    User,
    Group,
    Post,
    Comment,
    LikeComment,
    LikePost
}