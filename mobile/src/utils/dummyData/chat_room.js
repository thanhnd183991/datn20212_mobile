export const chat_room = {
  id: "1",
  users: [
    {
      id: "u1",
      name: "Vadim",
      imageUri:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/vadim.jpg",
    },
    {
      id: "u2",
      name: "Elon Musk",
      imageUri:
        "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/elon.png",
    },
  ],
  messages: [
    {
      id: "m1",
      content: "How are you, Elon!",
      createdAt: "2020-10-10T12:48:00.000Z",
      user: {
        id: "u1",
        name: "Vadim",
      },
      images: [
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",

        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
      ],
      status: "SENT",
      replyTo: "m2",
    },
    {
      id: "m2",
      content: "I am good, good",
      createdAt: "2020-10-03T14:49:00.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      status: "SENT",
    },
    {
      id: "m3",
      content: "What about you?",
      createdAt: "2020-10-03T14:49:40.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      status: "SENT",
      replyTo: "m4",
    },
    {
      id: "m4",
      images: [
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",

        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
      ],
      createdAt: "2020-10-03T14:50:00.000Z",
      user: {
        id: "u1",
        name: "Vadim",
      },
      status: "SENT",
    },
    {
      id: "m5",
      content: "How is SpaceX doing?",
      createdAt: "2020-10-03T14:51:00.000Z",
      user: {
        id: "u1",
        name: "Vadim",
      },
      status: "SENT",
    },
    {
      id: "m6",
      content: "going to the Moooooon",
      createdAt: "2020-10-03T14:49:00.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      status: "SENT",
    },
    {
      id: "m7",
      content: "btw, SpaceX is interested in buying notJust.dev!",
      createdAt: "2020-10-03T14:53:00.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      status: "SENT",
    },
    {
      id: "m8",
      content: "going to the al",
      createdAt: "2021-10-03T14:49:00.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      status: "SENT",
    },
    {
      id: "m9",
      content: "btw, SpaceX is interested in buying notJust.dev!",
      createdAt: "2014-10-03T14:53:00.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      images: [
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",

        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
        "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80",

        "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-674010.jpg&fm=jpg",
      ],
      status: "SENT",
    },
    {
      id: "m10",
      content: "ajajfbtw, SpaceX is interested in buying notJust.dev!",
      createdAt: "2015-10-03T14:53:00.000Z",
      user: {
        id: "u2",
        name: "Elon Musk",
      },
      status: "SENT",
    },
  ],
};
