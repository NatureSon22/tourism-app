import { QueryParams } from "@/src/types/filter";
import { REALISTIC_EVENTS } from "../../constants/eventListing";
import { EVENT } from "../../types/listingTypes";

export type GetEventResponse = {
  data: {
    listings: EVENT[];
    pagination: {
      count: number;
      currentPage: number;
      limit: number;
      total: number;
    };
  };
};

export type RegistrationResponse = {
  bookingId: string;
  status: "confirmed" | "pending";
  confirmedAt: string;
};

const eventService = {
  getEventData: async (params: QueryParams): Promise<GetEventResponse> => {
    await new Promise((r) => setTimeout(r, 1000));

    const { search, page, limit } = params;
    let result = [...(REALISTIC_EVENTS ?? [])];

    if (search) {
      const query = search.toLowerCase().trim();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(query) ||
          e.addresses?.some((address) =>
            address.formatted.toLowerCase().includes(query),
          ) ||
          e.categories?.some((category) =>
            category.name.toLowerCase().includes(query),
          ),
      );
    }

    const currentPage = Math.max(1, page ?? 1);
    const limitPerPage = limit ?? 5;
    const total = result.length;
    const start = (currentPage - 1) * limitPerPage;
    const end = start + limitPerPage;
    const listings = result.slice(start, end);

    return {
      data: {
        listings,
        pagination: {
          count: listings.length,
          currentPage,
          limit: limitPerPage,
          total,
        },
      },
    };
  },

  getEventById: async (id: string): Promise<EVENT | undefined> => {
    await new Promise((r) => setTimeout(r, 500));
    return REALISTIC_EVENTS.find((event) => String(event.id) === id);
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
