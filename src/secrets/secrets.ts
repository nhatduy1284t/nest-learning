import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

const client = new SecretManagerServiceClient();

export async function getSecret(secretName) {
  const [version] = await client.accessSecretVersion({
    name: `projects/my-project/secrets/${secretName}/versions/latest`,
  });

  // Extract the payload as a string.
  const payload = version.payload.data.toString();

  return payload;
}
