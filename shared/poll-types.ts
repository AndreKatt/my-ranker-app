export interface Participants {
	[participantID: string]: string;
}

export interface Poll {
	id: string;
	topic: string;
	votesPerVoter: number;
	participants: Participants;
	adminID: string;
	// nominatuons: Nominations;
	// rankings: Rankings;
	// results: Results;
	// hasStarted: boolean;
}