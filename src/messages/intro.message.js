module.exports = {
  INTRO: {
    text: 'Hi @[username]! I\'m Tracker, a bot that helps reduce bias. I want to improve culture at [domain] so that everyone feels welcome. I do this in 3 ways:',
    attachments: [{
      fallback: 'Report bias by using the report function in a direct message',
      title: 'I can report bias that you have experienced.',
      text: 'Report those “small” issues - like getting interrupted or always being asked to get coffee. I’ll collect details from you to create a report to submit. You can report with your name attached or anonymized.\nDo this with my `/tracker report` command in a direct message.',
      mrkdwn_in: ['text'],
    }, {
      fallback: 'View aggregated reports to see trends and take action.',
      title: 'I aggregate all reports so that management can view trends and take action.',
      text: 'Collectively, all these incidents add up to affect our culture and make people uncomfortable. Managers receive automated reports that highlight patterns so that they can take corrective actions.\nDo this with my `/tracker dashboard` command in a direct message. (Managers only).',
      mrkdwn_in: ['text'],
    }, {
      fallback: 'Provide recommendations to reduce bias',
      title: 'I can provide personalized recommendations to increase inclusiveness.',
      text: 'I’ll send tips and tools to help you navigate situations where you feel uncomfortable. I can also suggest management techniques for those in power to make sure everyone feels safe.\nDo this with my `/tracker tips` command in a direct message.',
      mrkdwn_in: ['text'],
    }],
  },
};
