from dataclasses import dataclass
from typing import List


@dataclass
class Test:
    test: bool


class ResponseGenerator:
    def __init__(self, logger: Logger):
        self.logger = logger

    async def generate_response(self, human_input: str, call_context: CallContext) -> AsyncGenerator[ResponseResult, None]:
        # Assumes that the input has been pre-processed by the agent.

        # Try to get a heuristic response first.
        maybe_heuristic_response = self._maybe_heuristic_response_from_input(
            human_input, call_context)
        if maybe_heuristic_response.response is not None:
            yield maybe_heuristic_response
            return

        # Make the call to the LLM to generate the response based on the human input and the context of the call
        async for llm_response in self.process_response(human_input, call_context):
            yield llm_response

    def _maybe_heuristic_response_from_input(self, human_input: str, call_context: CallContext) -> ResponseResult:
        # If we can determine the response without using the model, do that instead.
        return ResponseResult(response=None, intent=None, action=None)

    async def process_response(self, llm_response: str, call_context: CallContext) -> AsyncGenerator[ResponseResult, None]:
        '''Process the response from the LLM'''
        response = self._sanitize_response(llm_response)

        # Detect if the response indicates a call transition (e.g. next inquiry, next phase, claims intents)
        potential_call_transition = self._detect_call_transitions(
            response, call_context)
        if potential_call_transition is not None:
            yield potential_call_transition
            return

        # Otherwise, apply the other response transformations in order
        response = self._handle_spelled_words(response, call_context)
        response = self._apply_replacements(response, call_context)
        response = self._handle_dtmf_logic(response, call_context)
        response = self._handle_feedback(response, call_context)
        yield ResponseResult(response=response, intent=None, action=None)
