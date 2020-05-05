'use strict'

/**
 * Hide Typing Event Implementation
 * Instagram using `RealtimeClient` (MQTT) Protocol to publish typing event in direct message.
 * To prevent this action, hook the `publish` method in class `RealtimeClientManager` in `com.instagram.realtimeclient` package.
 * First param contain a `topic` (string), and second param containing `payload` (JSON string) of topic.
 * Topic of typing event is `/ig_send_message` and attribute of json object is `action` with value `indicate_activity`
 */
function hideTypingEvent () {
  const realtimeClientManagerCls = Java.use('com.instagram.realtimeclient.RealtimeClientManager')
  realtimeClientManagerCls.publish.implementation = function (topic, payload, param3, param4) {
    // set condition
    const isTopicIgSendMessage = topic === '/ig_send_message'
    const isActionIndicateActivity = JSON.parse(payload).action === 'indicate_activity'
    // if condition is true return for stop execution.
    if (isTopicIgSendMessage && isActionIndicateActivity) return
    // else call original implementation with original param
    realtimeClientManagerCls.publish.call(this, topic, payload, param3, param4)
  }
}

// TO DO COMMENT
function hideMarkSeenStory () {
  const x1rnCls = Java.use('X.1rN')
  x1rnCls.A0J.implementation = function (param) {
    param._A03.value.clear()
    return x1rnCls.A0J.call(this, param)
  }
}


Java.perform(function () {
  console.log('Reload script ...')

  hideMarkSeenStory()
  hideTypingEvent()
})