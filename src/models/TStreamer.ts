enum TStreamer {
	NORMAL = "Normal",
	AFFILIATE = "Afilliate",
	PARTNER = "Partner",
}

namespace TStreamer {
	/**
	 * Returns a TStreamer depending of the type given by the Twitch API
	 * @param type
	 * @returns TStreamer
	 */
	export function identifyStreamer(type: string): TStreamer {
		let streamerType;

		switch (type) {
			case "":
				streamerType = TStreamer.NORMAL;
				break;
			case "affiliate":
				streamerType = TStreamer.AFFILIATE;
				break;
			case "partner":
				streamerType = TStreamer.PARTNER;
				break;
			default:
				throw new Error("This type is invalid");
		}

		return streamerType;
	}
}

export default TStreamer;
