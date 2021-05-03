import mongoose, { mongo } from "mongoose"
const { Schema } = mongoose;


const imageSchema = new mongoose.schema({
    src: String,
    width: Number,
    height: Number
})

const UserSchema = new mongoose.schema({
    name: String,
    Email: {type: String, required: true, unique: true},
    password: String,
    image: [imageSchema],
    age: Number,
    sex: String,
    adress: String,
    bio: String,
    birth: String,
    myGroup: [{type: Schema.Types.ObjectId, ref: 'Group'}],
    posts: [PostsSchema],
    schedule: [ScheduleSchema]
},{ timestamps: true});


const GroupSchema = new mongoose.schema({
    name:String,
    bio: String,
    MyUser: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    schedule: [scheduleSchema],
    postBoard: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    image: [imageSchema],
    
},{ timestamps: true});

const PostsSchema = new mongoose.Schema({
    title: String,
    writer: { type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    image: [imageSchema],
    comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}],
    likes : [{tyoe: Schema.Types.ObjectId, ref: 'LikePost'}],
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


User = mongoose.model('User',UserSchema);
Group = mongoose.model('Group',GroupSchema);
Post = mongoose.model('Post', PostSchema);
Comment = mongoose.model('Comment',CommentSchema);
LikeComment = mongoose.model('LikeComment',LikeCommentSchema);
LikePost = mongoose.model('LikePost',LikePostSchema);

export default{
    User,
    Group,
    Post,
    Comment,
    LikeComment,
    LikePost
}