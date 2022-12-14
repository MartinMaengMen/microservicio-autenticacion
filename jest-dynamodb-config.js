module.exports = {
    tables: [
      {
        TableName: `users`,
        KeySchema: [{AttributeName: 'email', KeyType: 'HASH'}],
        AttributeDefinitions: [{AttributeName: 'email', AttributeType: 'S'}],
        ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
      },
      // etc
    ],
  };