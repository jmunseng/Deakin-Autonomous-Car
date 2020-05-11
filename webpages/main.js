var carSound = new Audio('sound.wav')
var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        ws_address: 'ws://13.211.76.218:9090',
        logs: [],
        loading: false,
        topic: null,
        message: null,
    },
    // helper methods to connect to ROS

    //------------- connect Websocket -----------
    methods: {
        connect: function () {
            this.logs.unshift('connect to rosbridge server!!')
            //this.loading = true
            this.ros = new ROSLIB.Ros({
                url: this.ws_address
            })
            this.ros.on('connection', () => {
                this.logs.unshift('connected!!')
                this.connected = true
                // this.loading = false
            })
            this.ros.on('error', (error) => {
                this.logs.unshift('ERROR connecting to web socket server!!')
            })
            this.ros.on('close', () => {
                this.logs.unshift('Connection to web socket server closed')
                this.connected = false
            })
        },
        disconnect: function () {
            this.ros.close()
        },
        //-------------END connect Websocket -----------

        setTopic: function () {
            this.topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
        },
        forward: function () {
            this.message = new ROSLIB.Message({
                linear: { x: 1, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        stop: function () {
            this.message = new ROSLIB.Message({
                linear: { x: 0, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        backward: function () {
            this.message = new ROSLIB.Message({
                linear: { x: -1, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        turnLeft: function () {
            this.message = new ROSLIB.Message({
                linear: { x: 0.5, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0.5, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        turnRight: function () {
            this.message = new ROSLIB.Message({
                linear: { x: 0.5, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: -0.5, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },
        soundPlay: function () {
            console.log("asdasd")
            carSound.play()

        },
    },
    mounted() {
    },

})