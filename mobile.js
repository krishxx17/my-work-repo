let highestZ = 1;

class Paper {
  holdingPaper = false;
  rotating = false;
  startX = 0;
  startY = 0;
  moveX = 0;
  moveY = 0;
  prevX = 0;
  prevY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentX = 0;
  currentY = 0;

  init(paper) {
    // 🌟 Touch Events for Mobile
    paper.addEventListener("touchstart", (e) => this.startMove(e.touches[0], paper));
    paper.addEventListener("touchmove", (e) => {
      e.preventDefault();
      this.move(e.touches[0], paper);
    });
    paper.addEventListener("touchend", () => this.endMove());

    // 🌟 Mouse Events for PC
    paper.addEventListener("mousedown", (e) => this.startMove(e, paper, e.button === 2)); // Right-click for rotation
    paper.addEventListener("mousemove", (e) => this.move(e, paper));
    paper.addEventListener("mouseup", () => this.endMove());
    paper.addEventListener("mouseleave", () => this.endMove());

    // 🖱️ Prevent Default Context Menu on Right Click (for rotation)
    paper.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  startMove(event, paper, isRightClick = false) {
    if (this.holdingPaper) return;

    this.holdingPaper = true;
    this.rotating = isRightClick;
    paper.style.zIndex = highestZ++;
    
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.prevX = this.startX;
    this.prevY = this.startY;
  }

  move(event, paper) {
    if (!this.holdingPaper) return;

    this.moveX = event.clientX;
    this.moveY = event.clientY;
    this.velX = this.moveX - this.prevX;
    this.velY = this.moveY - this.prevY;

    if (this.rotating) {
      const dx = this.moveX - this.startX;
      const dy = this.moveY - this.startY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      this.rotation = (360 + Math.round(angle)) % 360;
    } else {
      this.currentX += this.velX;
      this.currentY += this.velY;
    }

    this.prevX = this.moveX;
    this.prevY = this.moveY;
    
    paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotate(${this.rotation}deg)`;
  }

  endMove() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

const papers = document.querySelectorAll(".paper");
papers.forEach(paper => new Paper().init(paper));
