import { Entity } from '@/core/domain/entity';
import { Duration } from '../value-objects/duration';
import { UniqueId } from '@/core/domain/unique-id';

export interface OptionServiceProps {
  name: string;
  description: string;
  photo: string;
  price: number;
  duration: Duration;
  barberId: UniqueId;
}

interface CreateOptionServiceProps {
  name: string;
  description: string;
  durationInSec: number;
  photo: string;
  price: number;
  barberId: string;
}

export class OptionService extends Entity<OptionServiceProps> {
	get duration() {
		return this.props.duration;
	}

	get name() {
		return this.props.name;
	}

	get description() {
		return this.props.description;
	}

	get price() {
		return this.props.price;
	}

	static create(props: CreateOptionServiceProps, id?: UniqueId) {
		return new OptionService({
			...props,
			barberId: new UniqueId(props.barberId),
			duration: Duration.generate(props.durationInSec)
		}, id);
	}
}
