import { JSONSchema7 } from 'json-schema';
import { v4 } from 'uuid';

const isNotEmpty = (...propertyNames: string[]): JSONSchema7 => {
  const properties = {};
  propertyNames.forEach(
    (property) =>
      (properties[property] = {
        minLength: 1,
        description: `The "${property}" cannot be empty`,
      }),
  );
  return {
    if: {
      propertyNames: {
        enum: [...propertyNames],
      },
    },
    then: { properties },
  };
};

export const webhookSchema: JSONSchema7 = {
  $id: v4(),
  type: 'object',
  properties: {
    webhook: {
      type: 'object',
      properties: {
        enabled: { type: 'boolean' },
        url: { type: 'string' },
        byEvents: { type: 'boolean' },
        base64: { type: 'boolean' },
        events: {
          type: 'array',
          minItems: 0,
          items: {
            type: 'string',
            enum: [
              'APPLICATION_STARTUP',
              'QRCODE_UPDATED',
              'MESSAGES_SET',
              'MESSAGES_UPSERT',
              'MESSAGES_EDITED',
              'MESSAGES_UPDATE',
              'MESSAGES_DELETE',
              'SEND_MESSAGE',
              'CONTACTS_SET',
              'CONTACTS_UPSERT',
              'CONTACTS_UPDATE',
              'PRESENCE_UPDATE',
              'CHATS_SET',
              'CHATS_UPSERT',
              'CHATS_UPDATE',
              'CHATS_DELETE',
              'GROUPS_UPSERT',
              'GROUP_UPDATE',
              'GROUP_PARTICIPANTS_UPDATE',
              'CONNECTION_UPDATE',
              'LABELS_EDIT',
              'LABELS_ASSOCIATION',
              'CALL',
              'TYPEBOT_START',
              'TYPEBOT_CHANGE_STATUS',
            ],
          },
        },
      },
      required: ['enabled', 'url'],
      ...isNotEmpty('enabled', 'url'),
    },
  },
  required: ['webhook'],
};
