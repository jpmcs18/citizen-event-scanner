import { EventInventoryEnd } from '../endpoints';
import { httpGet } from './base';

export async function getRemainingInventory(
  scannerId: number,
  eventId: number
): Promise<number | undefined> {
  return httpGet(
    EventInventoryEnd.GetRemainingInventory +
      `?scannerId=${scannerId}&eventId=${eventId}`
  );
}
