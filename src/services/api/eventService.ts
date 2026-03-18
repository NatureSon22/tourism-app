import { Event, REALISTIC_EVENTS } from "../../constants/eventListing";

export type EventParams = {
  search?: string;
  sort?: string;
  filters?: any;
};

export type GetEventResponse = {
  data: Event[];
  total: number;
};

export type RegistrationResponse = {
  bookingId: string;
  status: "confirmed" | "pending";
  confirmedAt: string;
};

const eventService = {
  getEventData: async ({
    search,
    filters,
  }: EventParams): Promise<GetEventResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    let result = [...(REALISTIC_EVENTS ?? [])];

    if (search) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.location.toLowerCase().includes(query),
      );
    }

    return {
      data: result,
      total: result.length,
    };
  },

  getEventById: async (id: string): Promise<Event | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return REALISTIC_EVENTS.find((event) => event.id === id);
  },

  registerForEvent: async (
    eventId: number,
    userId: number,
    ticketQty: number = 1,
  ): Promise<RegistrationResponse> => {
    // await api.post(`/events/${eventId}/register`, { userId, ticketQty });
    await new Promise((r) => setTimeout(r, 1500));

    console.log(`User ${userId} registering for event ${eventId}`);

    return {
      bookingId: `REG-${Math.floor(Math.random() * 90000) + 10000}`,
      status: "confirmed",
      confirmedAt: new Date().toISOString(),
    };
  },
};

export default eventService;
