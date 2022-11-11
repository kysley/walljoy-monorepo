import {Page} from '../components/page';
import {Card} from '../components/system';
import {vars} from '../components/system/theme/global-theme.css';
import {useDevicesQuery} from '../graphql/gen';

export const Devices = () => {
  const [res] = useDevicesQuery();

  if (res.fetching) {
    return <span>loading devices</span>;
  }

  return (
    <Page title="Devices">
      {res.data?.devices?.map((device) => (
        <Card key={device.id}>
          <h2>{device.name}</h2>
          <span>{device.deviceId}</span>
        </Card>
      ))}
    </Page>
  );
};
