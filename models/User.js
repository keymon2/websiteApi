import mongoose from "mongoose"
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
    posts: [PostsSchema],
    schedule: [ScheduleSchema]
},{ timestamps: true});


const GroupSchema = new mongoose.schema({
    name:String,
    bio: String,
    followUser: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    schedule: [scheduleSchema],
    postBoard: [PostsSchema],
    image: [imageSchema],
    
},{ timestamps: true});

const PostsSchema = new mongoose.Schema({
    title: String,
    writer: { type: Schema.Types.ObjectId, ref: 'User'},
    content: String,
    image: [imageSchema],
    commnet_count: Number,
    like_count: Number,
},{ timestamps: true})

const commentSchema = new mongoose.Schema({
    content: String,
    likes: {type: Schema.Types.ObjectId, ref: 'Like'},
    post_id: {type: Schema.Types.ObjectId, ref: 'Post'}
},{timestamps: true})
User = mongoose.model('User',UserSchema);
Group = mongoose.model('Group',GroupSchema);
Post = mongoose.model('Post', PostSchema)
