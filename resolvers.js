const users = [
    { id: '1', name: 'John Doe', email: 'john@example.com' },
    { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
  ];
  
  const posts = [
    { id: '1', title: 'First Post', content: 'This is the first post', authorId: '1' },
    { id: '2', title: 'Second Post', content: 'This is the second post', authorId: '2' },
  ];
  
  const comments = [
    { id: '1', text: 'Great post!', authorId: '2', postId: '1' },
    { id: '2', text: 'Thanks for sharing', authorId: '1', postId: '2' },
  ];
  
  const resolvers = {
    Query: {
      users: () => users,
      user: (parent, args) => users.find(user => user.id === args.id),
      posts: () => posts,
      post: (parent, args) => posts.find(post => post.id === args.id),
      comments: () => comments,
      comment: (parent, args) => comments.find(comment => comment.id === args.id),
    },
    Mutation: {
      createUser: (parent, args) => {
        const user = { id: `${users.length + 1}`, name: args.name, email: args.email };
        users.push(user);
        return user;
      },
      updateUser: (parent, args) => {
        const user = users.find(user => user.id === args.id);
        if (!user) return null;
        if (args.name) user.name = args.name;
        if (args.email) user.email = args.email;
        return user;
      },
      deleteUser: (parent, args) => {
        const userIndex = users.findIndex(user => user.id === args.id);
        if (userIndex === -1) return null;
        const deletedUser = users.splice(userIndex, 1);
        return deletedUser[0];
      },
      createPost: (parent, args) => {
        const post = { id: `${posts.length + 1}`, title: args.title, content: args.content, authorId: args.authorId };
        posts.push(post);
        return post;
      },
      updatePost: (parent, args) => {
        const post = posts.find(post => post.id === args.id);
        if (!post) return null;
        if (args.title) post.title = args.title;
        if (args.content) post.content = args.content;
        return post;
      },
      deletePost: (parent, args) => {
        const postIndex = posts.findIndex(post => post.id === args.id);
        if (postIndex === -1) return null;
        const deletedPost = posts.splice(postIndex, 1);
        return deletedPost[0];
      },
      createComment: (parent, args) => {
        const comment = { id: `${comments.length + 1}`, text: args.text, authorId: args.authorId, postId: args.postId };
        comments.push(comment);
        return comment;
      },
      updateComment: (parent, args) => {
        const comment = comments.find(comment => comment.id === args.id);
        if (!comment) return null;
        if (args.text) comment.text = args.text;
        return comment;
      },
      deleteComment: (parent, args) => {
        const commentIndex = comments.findIndex(comment => comment.id === args.id);
        if (commentIndex === -1) return null;
        const deletedComment = comments.splice(commentIndex, 1);
        return deletedComment[0];
      },
    },
    User: {
      posts: (parent) => posts.filter(post => post.authorId === parent.id),
    },
    Post: {
      author: (parent) => users.find(user => user.id === parent.authorId),
      comments: (parent) => comments.filter(comment => comment.postId === parent.id),
    },
    Comment: {
      author: (parent) => users.find(user => user.id === parent.authorId),
      post: (parent) => posts.find(post => post.id === parent.postId),
    },
  };
  
  module.exports = resolvers;
  