<template>
  <div class="bg-funky">
    <div class="container">
      <h3 class="heading text-center">Chat Socket test</h3>
      <div v-if="username !== null" class="messaging">
        <div class="inbox_msg">
          <div class="mesgs">
            <div class="msg_history">
              <div
                :class="
                  item.username === String(username)
                    ? 'incoming_msg'
                    : 'outgoing_msg'
                "
                v-for="(item, i) in items"
                :key="i"
              >
                <div
                  v-if="item.username !== String(username)"
                  class="incoming_msg_img"
                >
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div
                  :class="
                    item.username === String(username)
                      ? ' sent_msg'
                      : 'received_msg'
                  "
                >
                  <div class="received_withd_msg">
                    <p>
                      {{ item.message }}
                    </p>
                    <span class="time_date">
                      11:01 AM | June 9 | {{ item.username }}</span
                    >
                  </div>
                </div>
              </div>
              <!-- <div class="outgoing_msg">
                <div class="sent_msg">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                  <span class="time_date"> 11:01 AM | June 9</span>
                </div>
              </div>
              <div class="incoming_msg">
                <div class="incoming_msg_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>Test, which is a new approach to have</p>
                    <span class="time_date"> 11:01 AM | Yesterday</span>
                  </div>
                </div>
              </div>
              <div class="outgoing_msg">
                <div class="sent_msg">
                  <p>Apollo University, Delhi, India Test</p>
                  <span class="time_date"> 11:01 AM | Today</span>
                </div>
              </div>
              <div class="incoming_msg">
                <div class="incoming_msg_img">
                  <img
                    src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil"
                  />
                </div>
                <div class="received_msg">
                  <div class="received_withd_msg">
                    <p>
                      We work directly with our designers and suppliers, and
                      sell direct to you, which means quality, exclusive
                      products, at a price anyone can afford.
                    </p>
                    <span class="time_date"> 11:01 AM | Today</span>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="container d-inline-flex py-3">
          <input class="form-control" placeholder="Mesaj" v-model="message" />
          <button
            class="bg-success btn"
            @click="sendMessage"
            :disabled="message === null"
          >
            Gönder
          </button>
        </div>
      </div>
      <div v-else>
        <div class="container d-inline-flex py-3">
          <form action="" class="w-100 form">
            <input
              class="form-control"
              placeholder="Adını Yaz"
              v-model="name"
            />
            <button
              class="bg-success btn mt-2"
              @click="username = name"
              :disabled="name === null "
            >
              Katıl
            </button>
          </form>
        </div>
      </div>
      <div class="credit text-center">
        <a href="https://github.com/srkn65" target="_blank">By Serkan Korkaç</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Chat",
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    customEmit: function () {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
    status(e) {
      console.log(e);
    },
    // message(e) {
    //   this.items.push(e);
    // },
    firstentry(e) {
      console.log(typeof e);
      e.forEach((element) => {
        console.log(element);
        this.items.push(element);
      });
    },
    subricemessage(e) {
      this.items.push(e);
      console.log('ads')
    },
  },
  data() {
    return {
      message: null,
      name: null,
      username: null,
      items: [],
    };
  },
  methods: {
    sendMessage() {
      this.$socket.emit("message", {
        room: this.$route.params.room,
        message: this.message,
        username: this.username,
      });
      this.message = null
    },
  },
  created() {
    this.$socket.emit("join", {
      username: this.username,
      room: this.$route.params.room,
    });
    this.$socket.emit("entry", { room: this.$route.params.room });
  },
};
</script>