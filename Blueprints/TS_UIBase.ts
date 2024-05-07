import * as UE from 'ue';

class TS_UIBase extends UE.UserWidget {
    OnLoad(): void {
        this.hoverStates = new Map<UE.CanvasPanelSlot, boolean>();
    }

    OnHide(): void {}

    OnShow(): void {}

    // @no-blueprint
    hoverStates: Map<UE.CanvasPanelSlot, boolean>;

    CheckIfPositionHoverSlot(widget: UE.Widget, position: UE.Vector2D): boolean {
        const slot = widget.Slot as UE.CanvasPanelSlot;
        const _slotPos = slot.GetPosition();
        const _slotSize = slot.GetSize();
        const _slotRect = new UE.Vector2D(_slotPos.X, _slotPos.Y);
        _slotRect.X += _slotSize.X;
        _slotRect.Y += _slotSize.Y;
        const _hit = position.X > _slotPos.X && position.X < _slotRect.X && position.Y > _slotPos.Y && position.Y < _slotRect.Y;
        if (!this.hoverStates.has(slot)) {
            this.hoverStates.set(slot, false);
        } else {
            if (this.hoverStates.get(slot) != _hit) {
                this.hoverStates.set(slot, _hit);
                if (_hit) {
                    this.OnSlotHover(widget);
                } else {
                    this.OnSlotUnhover(widget);
                }
            }
        }
        return _hit;
    }

    OnSlotHover(slot: UE.Widget): void {}

    OnSlotUnhover(slot: UE.Widget): void {}
}

export default TS_UIBase;
