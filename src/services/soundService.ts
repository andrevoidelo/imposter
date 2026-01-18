import { Howl } from 'howler';

class SoundService {
  private clickSound: Howl;
  private successSound: Howl;
  private failureSound: Howl;
  private cardFlipSound: Howl;

  constructor() {
    this.clickSound = new Howl({ src: ['/sounds/click.mp3'], volume: 0.5 });
    this.successSound = new Howl({ src: ['/sounds/success.mp3'], volume: 0.5 });
    this.failureSound = new Howl({ src: ['/sounds/failure.mp3'], volume: 0.5 });
    this.cardFlipSound = new Howl({ src: ['/sounds/card-flip.mp3'], volume: 0.5 });
  }

  playClick() {
    this.clickSound.play();
  }

  playSuccess() {
    this.successSound.play();
  }

  playFailure() {
    this.failureSound.play();
  }

  playCardFlip() {
    this.cardFlipSound.play();
  }
}

export const soundService = new SoundService();
